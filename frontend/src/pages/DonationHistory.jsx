import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const DonationHistory = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");
            try {
                const user = JSON.parse(atob(token.split(".")[1]));
                setUserId(user.id);
                const res = await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/donations/history", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (!Array.isArray(data)) {
                    setError(data.error || "Unexpected response");
                    setDonations([]);
                } else {
                    setDonations(data);
                }
            } catch (err) {
                setError("Failed to fetch donation history");
                setDonations([]);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const handleComplete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/donations/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "completed" }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            setDonations((prev) =>
                prev.map((donation) =>
                    donation._id === id
                        ? { ...donation, status: "completed" }
                        : donation
                )
            );
        } catch (err) {
            alert("Failed to mark as completed");
        }
    };

    if (loading) return <div className="container"><div className="loading">Loading donation history...</div></div>;
    if (error) return <div className="container"><div className="loading">{error}</div></div>;

    return (
        <div className="container">
            <h1>Donation History</h1>
            {donations.length === 0 ? (
                <p>No donation history found.</p>
            ) : (
                <div className="card-grid">
                    {donations.map((donation) => (
                        <div key={donation._id} className="card donation-card">
                            <h3>{donation.type}</h3>
                            <p>{donation.description}</p>
                            <p>
                                Status: <span className={`status-badge ${donation.status.toLowerCase()}`}>{donation.status}</span>
                            </p>
                            <p>
                                Pickup Location: {donation.pickupLocation}{" "}
                                {donation.pickupLocation && (
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(donation.pickupLocation)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#007bff", marginLeft: 8 }}
                                    >
                                        View on Map
                                    </a>
                                )}
                            </p>
                            <p>
                                Donor:{" "}
                                {donation.donor?._id ? (
                                    <Link
                                        to={donation.donor._id === userId ? "/profile" : `/users/${donation.donor._id}`}
                                        style={{ color: "#007bff", cursor: "pointer" }}
                                    >
                                        {donation.donor.name}
                                    </Link>
                                ) : (
                                    donation.donor?.name
                                )}
                            </p>
                            <p>
                                Claimed By:{" "}
                                {donation.claimedBy?._id ? (
                                    <Link
                                        to={donation.claimedBy._id === userId ? "/profile" : `/users/${donation.claimedBy._id}`}
                                        style={{ color: "#007bff", cursor: "pointer" }}
                                    >
                                        {donation.claimedBy.name}
                                    </Link>
                                ) : (
                                    donation.claimedBy?.name
                                )}
                            </p>
                            {donation.images && donation.images.length > 0 && (
                                <div style={{ display: "flex", gap: 10, margin: "10px 0", flexWrap: "wrap" }}>
                                    {donation.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${img}`}
                                            alt="donation"
                                            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: "1px solid #ccc" }}
                                        />
                                    ))}
                                </div>
                            )}
                            {donation.status === "claimed" && donation.claimedBy?._id === userId && (
                                <button onClick={() => handleComplete(donation._id)}>
                                    Mark as Completed
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationHistory;