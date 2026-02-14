import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';

import { useLocation } from 'react-router-dom';

const Messages = () => {
    const { socket, user } = useSocket();
    const location = useLocation();
    const [conversations, setConversations] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        const init = async () => {
            await fetchConversations();

            // Check if we navigated here to chat with someone specific
            if (location.state?.chatWith) {
                const targetUser = location.state.chatWith;
                // Since conversations might not be loaded yet or might not exist, we just set the current user directly.
                // However, we should check if they are already in the conversations list to map properly.
                setCurrentChatUser(targetUser);
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

        socket.on("receive_message", (data) => {
            if (currentChatUser && data.from === currentChatUser._id) {
                setMessages((prev) => [...prev, { from: data.from, content: data.content, timestamp: data.timestamp }]);
                scrollToBottom();
            } else {
                fetchConversations();
            }
        });

        return () => socket.off("receive_message");
    }, [socket, currentChatUser]);

    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages/conversations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const validConvos = res.data.filter(c => c.user).reduce((acc, current) => {
                const x = acc.find(item => item.user._id === current.user._id);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            setConversations(validConvos);
            return validConvos; // Return for init to use if needed
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMessages = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(res.data);
            scrollToBottom();
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChatUser) return;

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/messages`, {
                to: currentChatUser._id,
                content: newMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessages((prev) => [...prev, res.data]);
            setNewMessage("");
            scrollToBottom();
            fetchConversations(); // Update last message in sidebar
        } catch (err) {
            console.error(err);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex h-[calc(100vh-100px)] glass-card overflow-hidden">
            {/* Sidebar - Conversation List */}
            <div className={`w-full md:w-1/3 border-r border-white/10 flex flex-col ${currentChatUser ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.length === 0 ? (
                        <div className="p-4 text-neutral-400 text-center">No conversations yet.</div>
                    ) : (
                        conversations.map((conv) => (
                            <div
                                key={conv.user._id}
                                onClick={() => setCurrentChatUser(conv.user)}
                                className={`flex items-center gap-3 p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${currentChatUser?._id === conv.user._id ? 'bg-white/10' : ''}`}
                            >
                                <img
                                    src={conv.user.profilePhoto ? `${import.meta.env.VITE_API_URL}/${conv.user.profilePhoto.replace(/\\/g, '/')}` : "https://via.placeholder.com/40"}
                                    alt={conv.user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-white font-medium truncate">{conv.user.name}</h3>
                                        <span className="text-xs text-neutral-500">{new Date(conv.lastMessage?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className="text-sm text-neutral-400 truncate">{conv.lastMessage?.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`w-full md:w-2/3 flex flex-col ${!currentChatUser ? 'hidden md:flex' : 'flex'}`}>
                {currentChatUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setCurrentChatUser(null)} className="md:hidden text-white">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </button>
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowProfile(true)}>
                                    <img
                                        src={currentChatUser.profilePhoto ? `${import.meta.env.VITE_API_URL}/${currentChatUser.profilePhoto.replace(/\\/g, '/')}` : "https://via.placeholder.com/40"}
                                        alt={currentChatUser.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-white font-bold">{currentChatUser.name}</h3>
                                        <p className="text-xs text-green-400">Online</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setShowProfile(!showProfile)} className="text-neutral-400 hover:text-white">
                                <span className="material-symbols-outlined">info</span>
                            </button>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/10">
                            {messages.map((msg, index) => {
                                const isMe = msg.from === user?.id || msg.from === user?._id;
                                return (
                                    <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-3 rounded-2xl ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                                            <p className="text-sm">{msg.content}</p>
                                            <p className="text-[10px] opacity-70 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                            />
                            <button type="submit" className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-500">
                        <span className="material-symbols-outlined text-6xl mb-4">chat_bubble_outline</span>
                        <p className="text-lg">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>

            {/* Profile Sidebar (Right) */}
            {showProfile && currentChatUser && (
                <div className="w-80 border-l border-white/10 bg-black/40 backdrop-blur-xl absolute right-0 top-0 bottom-0 z-50 p-6 flex flex-col animate-in slide-in-from-right duration-300">
                    <button onClick={() => setShowProfile(false)} className="self-end text-neutral-400 hover:text-white mb-6">
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 mb-4 shadow-lg shadow-blue-500/20">
                            <img
                                src={currentChatUser.profilePhoto ? `${import.meta.env.VITE_API_URL}/${currentChatUser.profilePhoto.replace(/\\/g, '/')}` : "https://via.placeholder.com/150"}
                                alt={currentChatUser.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-white text-center">{currentChatUser.name}</h2>
                        <p className="text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full text-xs font-bold uppercase mt-2">{currentChatUser.role}</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Location</h4>
                            <p className="text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-neutral-400">location_on</span>
                                {currentChatUser.location || "Unknown"}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Email</h4>
                            <p className="text-white flex items-center gap-2 truncate">
                                <span className="material-symbols-outlined text-neutral-400">mail</span>
                                {currentChatUser.email}
                            </p>
                        </div>

                        {/* About Images Gallery */}
                        {currentChatUser.images && currentChatUser.images.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Gallery</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {currentChatUser.images.map((img, idx) => (
                                        <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-blue-500 transition-colors cursor-pointer group relative">
                                            <img src={`${import.meta.env.VITE_API_URL}/${img.replace(/\\/g, '/')}`} alt="Gallery" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white">visibility</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;