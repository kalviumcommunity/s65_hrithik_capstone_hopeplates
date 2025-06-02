import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DonorProfile = () => {
    const { id } = useParams();
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/${id}`, {
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

    const handleImageClick = (idx) => {
        setCurrentImgIdx(idx);
        setModalOpen(true);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentImgIdx((prev) => (prev === 0 ? donor.images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentImgIdx((prev) => (prev === donor.images.length - 1 ? 0 : prev + 1));
    };

    const handleClose = () => setModalOpen(false);

    return (
        <div className="container">
            <div className="profile-container">
                <div className="profile-header" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <h1 style={{ margin: 0 }}>{donor.name}</h1>
                    {donor.profilePhoto && (
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${donor.profilePhoto}`}
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
                                src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${img}`}
                                alt="about"
                                style={{ width: 220, height: 220, borderRadius: 16, border: "2px solid #ccc", objectFit: "cover", cursor: "pointer" }}
                                onClick={() => handleImageClick(idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {modalOpen && donor.images && (
                <div
                    style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: "rgba(0,0,0,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                    onClick={handleClose}
                >
                    <button
                        onClick={handlePrev}
                        style={{
                            position: "absolute", left: 40, top: "50%",
                            fontSize: 40, color: "#fff", background: "none", border: "none", cursor: "pointer"
                        }}
                        aria-label="Previous"
                    >&#8592;</button>
                    <img
                        src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${donor.images[currentImgIdx]}`}
                        alt="about large"
                        style={{ maxHeight: "80vh", maxWidth: "80vw", borderRadius: 16, border: "4px solid #fff", boxShadow: "0 0 40px #000" }}
                        onClick={e => e.stopPropagation()}
                    />
                    <button
                        onClick={handleNext}
                        style={{
                            position: "absolute", right: 40, top: "50%",
                            fontSize: 40, color: "#fff", background: "none", border: "none", cursor: "pointer"
                        }}
                        aria-label="Next"
                    >&#8594;</button>
                    <button
                        onClick={handleClose}
                        style={{
                            position: "absolute", top: 30, right: 30,
                            fontSize: 30, color: "#fff", background: "none", border: "none", cursor: "pointer"
                        }}
                        aria-label="Close"
                    >&#10006;</button>
                </div>
            )}
        </div>
    );
};

export default DonorProfile;