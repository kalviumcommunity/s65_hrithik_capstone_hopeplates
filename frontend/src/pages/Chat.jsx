import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Chat = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [oppositeUser, setOppositeUser] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/messages/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setMessages(data);
            setLoading(false);
        };
        fetchMessages();
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setOppositeUser(data);
        };
        fetchUser();
    }, [id]);

    const handleSend = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const res = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ to: id, content: input })
        });
        const newMsg = await res.json();
        setMessages((prev) => [...prev, newMsg]);
        setInput("");
    };

    return (
        <div className="container">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                {oppositeUser && oppositeUser.profilePhoto && (
                    <img
                        src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${oppositeUser.profilePhoto}`}
                        alt="profile"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            border: "2px solid #ccc",
                            objectFit: "cover"
                        }}
                    />
                )}
                <h2 style={{ margin: 0, fontSize: 22 }}>
                    {oppositeUser ? oppositeUser.name : "Chat"}
                </h2>
            </div>
            <div style={{ border: "1px solid #ccc", padding: 16, minHeight: 200, maxHeight: 400, overflowY: "auto" }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} style={{ margin: "8px 0", textAlign: msg.from === id ? "left" : "right" }}>
                            <span style={{ background: "#f1f1f1", padding: 8, borderRadius: 8 }}>
                                {msg.content}
                            </span>
                        </div>
                    ))
                )}
            </div>
            <form onSubmit={handleSend} style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: 8 }}
                    required
                />
                <button type="submit" style={{ padding: "8px 16px" }}>Send</button>
            </form>
        </div>
    );
};

export default Chat;