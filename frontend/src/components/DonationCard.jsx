const DonationCard = ({ donation, onDelete, onUpdate, onStatusChange, userId, userRole }) => {
    const isDonor = donation.donor?._id === userId
    return (
        <div className="card donation-card">
            <h3>{donation.type}</h3>
            <p>{donation.description}</p>
            <p>Pickup Location: {donation.pickupLocation}</p>
            <p>Status: <span className={`status-badge ${donation.status.toLowerCase()}`}>{donation.status}</span></p>
            <p>Donor Name: {donation.donor?.name }</p>
            <p>Type : {donation.donor?.role}</p>
            {donation.images && donation.images.length > 0 && (
                <div style={{ display: "flex", gap: 10, margin: "10px 0", flexWrap: "wrap" }}>
                    {donation.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={`http://localhost:5000/${img}`}
                            alt="donation"
                            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: "1px solid #ccc" }}
                        />
                    ))}
                </div>
            )}
            {isDonor && donation.status === "claimed" && donation.claimedBy && (
                <p>
                    Claimed By: <strong>{donation.claimedBy.name}</strong> ({donation.claimedBy.role})
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