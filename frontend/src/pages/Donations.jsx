import { useEffect, useState } from "react";
import DonationCard from "../components/DonationCard";

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchDonations = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:5000/api/donations", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setDonations(data);

                const user = JSON.parse(atob(token.split(".")[1]));
                setUserId(user.id);
                setUserRole(user.role);
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDonations();
    }, []);

    const handleStatusChange = async (id, status) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5000/api/donations/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const updatedDonation = await response.json();
            setDonations((prev) =>
                prev.map((donation) =>
                    donation._id === id ? updatedDonation.donation : donation
                )
            );
        } catch (err) {
            console.error("Error updating donation status:", err.message);
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5000/api/donations/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            alert("Donation deleted successfully!");
            setDonations((prev) => prev.filter((donation) => donation._id !== id));
        } catch (err) {
            console.error("Error deleting donation:", err.message);
            alert(err.message);
        }
    };


    const handleUpdate = (donation) => {
        alert(`Update donation: ${donation._id}`);
    };

    return (
        <div className="container">
            <h1>Your Donations</h1>
            {loading ? (
                <div className="loading">Loading donations...</div>
            ) : donations.length > 0 ? (
                <div className="card-grid">
                    {donations.map((donation) => (
                        <DonationCard
                            key={donation._id}
                            donation={donation}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}  
                            onStatusChange={handleStatusChange}
                            userId={userId}
                            userRole={userRole}
                        />
                    ))}
                </div>
            ) : (
                <p>No donations found.</p>
            )}
        </div>
    );
};

export default Donations;