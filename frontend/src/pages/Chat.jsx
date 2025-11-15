import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import "../App.css"

const Chat = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(true)
    const [oppositeUser, setOppositeUser] = useState(null)
    const [currentUserId, setCurrentUserId] = useState(null)
    const [isUserScrolling, setIsUserScrolling] = useState(false)

    const messagesEndRef = useRef(null)
    const messagesContainerRef = useRef(null)
    const previousScrollHeight = useRef(0)
    const isInitialLoad = useRef(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]))
                setCurrentUserId(payload.userId || payload.id)
            } catch (e) {
                console.error("Error parsing token:", e)
            }
        }
    }, [])

    const fetchMessages = async () => {
        const token = localStorage.getItem("token")
        const res = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/messages/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setMessages(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchMessages()
        const interval = setInterval(fetchMessages, 2000)
        return () => clearInterval(interval)
    }, [id])

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")
            const res = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            setOppositeUser(data)
        }
        fetchUser()
    }, [id])

    useEffect(() => {
        if (isInitialLoad.current && messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
            isInitialLoad.current = false
        } else if (!isUserScrolling && messagesContainerRef.current) {
            const container = messagesContainerRef.current
            const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100
            
            if (isNearBottom) {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [messages])

    const handleScroll = () => {
        if (!messagesContainerRef.current) return
        
        const container = messagesContainerRef.current
        const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 10
        
        setIsUserScrolling(!isAtBottom)
    }

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const token = localStorage.getItem("token")
        const res = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ to: id, content: input })
        })
        const newMsg = await res.json()
        setMessages(prev => [...prev, newMsg])
        setInput("")
        setIsUserScrolling(false)
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend(e)
        }
    }

    return (
        <div className="chat-page-wrapper">
            <div className="chat-container">
                <div className="chat-header">
                    {oppositeUser?.profilePhoto && (
                        <img
                            src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${oppositeUser.profilePhoto}`}
                            alt="profile"
                            className="chat-avatar"
                        />
                    )}
                    <div className="chat-header-info">
                        <h2
                            className="chat-title"
                            onClick={() => navigate(`/users/${id}`)}
                            title={`View ${oppositeUser?.name}'s profile`}
                        >
                            {oppositeUser ? oppositeUser.name : "Chat"}
                        </h2>
                        <span className="chat-status">Online</span>
                    </div>
                </div>

                <div className="messages-wrapper">
                    <div 
                        className="messages-container" 
                        ref={messagesContainerRef}
                        onScroll={handleScroll}
                    >
                        {loading ? (
                            <div className="chat-loading">Loading messages...</div>
                        ) : messages.length === 0 ? (
                            <div className="chat-empty">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`message-bubble ${
                                            msg.from === currentUserId ? "outgoing" : "incoming"
                                        }`}
                                    >
                                        <div className="message-content">
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSend} className="chat-input-form">
                    <div className="message-input-container">
                        <textarea
                            className="message-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type the message...."
                            rows={1}
                        />
                    </div>
                    <button type="submit" className="send-button" disabled={!input.trim()}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat