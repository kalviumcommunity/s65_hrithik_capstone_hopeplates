import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConversations = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/messages/conversations", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setConversations(data);
            setLoading(false);
        };
        fetchConversations();
    }, []);

    return (
        <div className="container">
            <h2>Messages</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {conversations.map((conv, idx) => (
                        <li
                            key={idx}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "12px 0",
                                borderBottom: "1px solid #eee",
                                cursor: "pointer"
                            }}
                            onClick={() => navigate(`/chat/${conv.user._id}`)}
                        >
                            <img
                                src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${conv.user.profilePhoto}`}
                                alt="profile"
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "2px solid #ccc"
                                }}
                            />
                            <div>
                                <strong>{conv.user.name}</strong>
                                <div style={{ fontSize: 13, color: "#555" }}>
                                    {conv.lastMessage?.content || "No messages yet"}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Messages;