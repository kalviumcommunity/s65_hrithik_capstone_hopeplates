import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DonorProfile = () => {
    const { id } = useParams();
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:5000/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setDonor(data);
            } catch (err) {
                setDonor(null);
            } finally {
                setLoading(false);
            }
        };
        fetchDonor();
    }, [id]);

    if (loading) return <div className="container"><div className="loading">Loading profile...</div></div>;
    if (!donor) return <div className="container"><div className="loading">Donor not found.</div></div>;

    return (
        <div className="container">
            <div className="profile-container">
                <div className="profile-header" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <h1 style={{ margin: 0 }}>{donor.name}</h1>
                    {donor.profilePhoto && (
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={`http://localhost:5000/${donor.profilePhoto}`}
                                alt="profile"
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    border: "2px solid #ccc",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="profile-details" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                    <div>
                        <strong>Name:</strong> <span>{donor.name}</span>
                    </div>
                    <div>
                        <strong>Email:</strong> <span>{donor.email}</span>
                    </div>
                    <div>
                        <strong>Location:</strong> <span>{donor.location || "N/A"}</span>
                    </div>
                    <div>
                        <strong>Role:</strong> <span>{donor.role}</span>
                    </div>
                    {donor.phone && (
                        <div>
                            <strong>Phone:</strong> <span>{donor.phone}</span>
                        </div>
                    )}
                    {donor.about && (
                        <div>
                            <strong>About:</strong> <span>{donor.about}</span>
                        </div>
                    )}
                    {donor.createdAt && (
                        <div>
                            <strong>Joined:</strong> <span>{new Date(donor.createdAt).toLocaleDateString()}</span>
                        </div>
                    )}
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 10 }}>
                        {donor.images && donor.images.length > 0 && donor.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={`http://localhost:5000/${img}`}
                                alt="about"
                                style={{ width: 220, height: 220, borderRadius: 16, border: "2px solid #ccc", objectFit: "cover" }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorProfile;