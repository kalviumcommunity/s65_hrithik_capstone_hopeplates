import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const Messages = () => {
    const { socket, user } = useSocket();
    const location = useLocation();
    const [conversations, setConversations] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const [showProfile, setShowProfile] = useState(false);

    // Dynamic API URL handling
    const API_BASE = window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://s65-hrithik-capstone-hopeplates.onrender.com";

    useEffect(() => {
        const init = async () => {
            await fetchConversations();

            // Check if we navigated here to chat with someone specific
            if (location.state?.chatWith) {
                const targetUser = location.state.chatWith;
                setCurrentChatUser(targetUser);
                // Also ensure this user is in our conversation list visually or handled
                // If not in list, fetchConversations might add them if backend creates room implicitly or just UI update
            }
        };
        init();
    }, [location.state]);

    useEffect(() => {
        if (currentChatUser) {
            fetchMessages(currentChatUser._id);
        }
    }, [currentChatUser]);

    useEffect(() => {
        if (!socket) return;

        const handleReceiveMessage = (data) => {
            if (currentChatUser && (data.from === currentChatUser._id || data.senderId === currentChatUser._id)) {
                setMessages((prev) => [...prev, {
                    from: data.from || data.senderId,
                    content: data.content || data.message,
                    timestamp: data.timestamp || new Date()
                }]);
            } else {
                // If message is from someone else, refresh stats or show notification (optional)
                fetchConversations();
            }
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => socket.off("receive_message", handleReceiveMessage);
    }, [socket, currentChatUser]);

    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_BASE}/api/messages/conversations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Deduplicate conversations based on user ID
            const validConvos = res.data.filter(c => c.user).reduce((acc, current) => {
                const x = acc.find(item => item.user._id === current.user._id);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            setConversations(validConvos);
            return validConvos;
        } catch (err) {
            console.error("Error fetching conversations:", err);
        }
    };

    const fetchMessages = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_BASE}/api/messages/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(res.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChatUser) return;

        try {
            const token = localStorage.getItem('token');
            // Save to DB
            const res = await axios.post(`${API_BASE}/api/messages`, {
                to: currentChatUser._id,
                content: newMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const savedMsg = res.data;

            setMessages((prev) => [...prev, savedMsg]);
            setNewMessage("");
            // Scroll will happen via useEffect on messages change
            fetchConversations();
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    // Auto-scroll whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex h-[calc(100vh-100px)] glass-card overflow-hidden rounded-2xl border border-white/5">
            {/* Sidebar - Conversation List */}
            <div className={`w-full md:w-1/3 border-r border-white/10 flex flex-col ${currentChatUser ? 'hidden md:flex' : 'flex'} bg-black/40`}>
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Conversations</h2>
                    <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">{conversations.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {conversations.length === 0 ? (
                        <div className="p-8 text-neutral-500 text-center flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">forum</span>
                            <p>No conversations yet.</p>
                        </div>
                    ) : (
                        conversations.map((conv) => (
                            <div
                                key={conv.user._id}
                                onClick={() => setCurrentChatUser(conv.user)}
                                className={`flex items-center gap-4 p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all duration-200 group ${currentChatUser?._id === conv.user._id ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
                            >
                                <div className="relative">
                                    <img
                                        src={conv.user.profilePhoto ? `${API_BASE}/${conv.user.profilePhoto.replace(/\\/g, '/')}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(conv.user.name)}&background=random`}
                                        alt={conv.user.name}
                                        className="w-12 h-12 rounded-full object-cover shadow-lg border border-white/10"
                                    />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-white font-semibold truncate group-hover:text-blue-400 transition-colors">{conv.user.name}</h3>
                                        {conv.lastMessage && (
                                            <span className="text-xs text-neutral-500">{new Date(conv.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-neutral-400 truncate group-hover:text-neutral-300 transition-colors">{conv.lastMessage?.content || "No messages yet"}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`w-full md:w-2/3 flex flex-col ${!currentChatUser ? 'hidden md:flex' : 'flex'} bg-black/20`}>
                {currentChatUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setCurrentChatUser(null)} className="md:hidden text-neutral-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </button>
                                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowProfile(true)}>
                                    <div className="relative">
                                        <img
                                            src={currentChatUser.profilePhoto ? `${API_BASE}/${currentChatUser.profilePhoto.replace(/\\/g, '/')}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(currentChatUser.name)}&background=random`}
                                            alt={currentChatUser.name}
                                            className="w-10 h-10 rounded-full object-cover group-hover:ring-2 ring-blue-500 transition-all"
                                        />
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors">{currentChatUser.name}</h3>
                                        <p className="text-xs text-green-400 font-medium tracking-wide">Active Now</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowProfile(!showProfile)}
                                className={`p-2 rounded-full transition-all ${showProfile ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-neutral-400 hover:text-white hover:bg-white/10'}`}
                            >
                                <span className="material-symbols-outlined">info</span>
                            </button>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('/chat-bg-pattern.svg')] bg-repeat opacity-90">
                            {messages.map((msg, index) => {
                                const currentUserId = user?.id || user?._id;
                                const msgSenderId = typeof msg.from === 'object' ? (msg.from._id || msg.from.id) : msg.from;
                                const isMe = currentUserId && String(msgSenderId) === String(currentUserId);
                                return (
                                    <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                        <div className={`max-w-[75%] md:max-w-[60%] p-4 rounded-2xl shadow-lg relative group ${isMe
                                            ? 'bg-blue-600 text-white rounded-tr-none ml-12'
                                            : 'bg-zinc-800 text-zinc-100 rounded-tl-none mr-12'
                                            }`}>
                                            <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
                                            <p className={`text-[10px] mt-1 text-right font-medium tracking-wider ${isMe ? 'text-blue-200' : 'text-zinc-500'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-xl flex gap-3 items-center">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-neutral-600"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                            >
                                <span className="material-symbols-outlined filled">send</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 bg-black/20">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <span className="material-symbols-outlined text-5xl opacity-50">chat_bubble_outline</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Your Messages</h3>
                        <p className="text-sm max-w-xs text-center">Select a conversation from the sidebar to start chatting</p>
                    </div>
                )}
            </div>

            {/* Profile Sidebar (Right) - Animated */}
            {showProfile && currentChatUser && (
                <div className="w-80 border-l border-white/10 bg-zinc-950 absolute right-0 top-0 bottom-0 z-50 p-6 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 border-l border-white/10">
                    <button onClick={() => setShowProfile(false)} className="self-end text-neutral-400 hover:text-white mb-8 hover:rotate-90 transition-all duration-300">
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 mb-4 shadow-xl shadow-blue-500/20 ring-4 ring-black">
                            <img
                                src={currentChatUser.profilePhoto ? `${API_BASE}/${currentChatUser.profilePhoto.replace(/\\/g, '/')}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(currentChatUser.name)}&background=random`}
                                alt={currentChatUser.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-white text-center mb-1">{currentChatUser.name}</h2>
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20">{currentChatUser.role}</span>

                        {/* View Profile Button - ADDED */}
                        <Link
                            to={`/user/${currentChatUser._id}`}
                            className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white font-medium transition-all group"
                        >
                            <span>View Full Profile</span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">location_on</span> Location
                            </h4>
                            <p className="text-white font-medium">{currentChatUser.location || "Unknown"}</p>
                        </div>

                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">mail</span> Email
                            </h4>
                            <p className="text-white font-medium truncate" title={currentChatUser.email}>{currentChatUser.email}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;