import { useEffect, useState } from "react";

const DonationHistory = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");
            try {
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
                            <p>Status: <span className={`status-badge ${donation.status.toLowerCase()}`}>{donation.status}</span></p>
                            <p>Pickup Location: {donation.pickupLocation}</p>
                            <p>Donor: {donation.donor?.name}</p>
                            <p>Claimed By: {donation.claimedBy?.name}</p>
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationHistory;