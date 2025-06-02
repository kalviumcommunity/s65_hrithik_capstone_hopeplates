import { Link } from "react-router-dom";

const DonationCard = ({ donation, onDelete, onUpdate, onStatusChange, userId, userRole }) => {
    const isDonor = donation.donor?._id === userId;
    return (
        <div className="card donation-card">
            <h3>{donation.type}</h3>
            <p>{donation.description}</p>
            <p>Pickup Location: {donation.pickupLocation}</p>
            {donation.pickupLocation && (
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(donation.pickupLocation)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#007bff"}}
                >
                    View on Map
                </a>
            )}
            <p>Status: <span className={`status-badge ${donation.status.toLowerCase()}`}>{donation.status}</span></p>
            <p>
                Donor Name:{" "}
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
            <p>Type : {donation.donor?.role}</p>
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
            {["claimed", "completed"].includes(donation.status) && donation.claimedBy && (
                <p>
                    Claimed By:{" "}
                    {donation.claimedBy._id ? (
                        <Link
                            to={donation.claimedBy._id === userId ? "/profile" : `/users/${donation.claimedBy._id}`}
                            style={{ color: "#007bff", cursor: "pointer" }}
                        >
                            {donation.claimedBy.name}
                        </Link>
                    ) : (
                        donation.claimedBy.name
                    )}{" "}
                    ({donation.claimedBy.role})
                </p>
            )}

            {userRole === "ngo" && donation.status === "pending" && (
                <button
                    className="action-button claim"
                    onClick={() => onStatusChange(donation._id, "claimed")}
                >
                    Claim
                </button>
            )}
            {userRole === "ngo" && donation.status === "claimed" && donation.claimedBy?._id === userId && (
                <button
                    className="action-button complete"
                    onClick={() => onStatusChange(donation._id, "completed")}
                >
                    Complete
                </button>
            )}

            {isDonor && donation.status === "pending" && (
                <div style={{ marginTop: 10 }}>
                    <button
                        className="action-button"
                        style={{ backgroundColor: "#f9a826", marginRight: 8 }}
                        onClick={() => onUpdate && onUpdate(donation)}
                    >
                        Update
                    </button>
                    <button
                        className="action-button reject"
                        onClick={() => onDelete && onDelete(donation._id)}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default DonationCard;