const DonationCard = ({ donation, onDelete, onUpdate, onStatusChange, userId, userRole }) => {
    return (
        <div className="card donation-card">
            <h3>{donation.type}</h3>
            <p>{donation.description}</p>
            <p>Pickup Location: {donation.pickupLocation}</p>
            <p>Status: <span className={`status-badge ${donation.status.toLowerCase()}`}>{donation.status}</span></p>
            <p>Donor Name: {donation.donor?.name || "Unknown"}</p>
            <p>Donor Role: {donation.donor?.role || "Unknown"}</p>

            {/* Show Update and Delete buttons for all roles except NGO */}
            {userRole !== "ngo" && (
                <>
                    <button
                        className="action-button delete"
                        onClick={() => onDelete(donation._id)}
                    >
                        Delete
                    </button>
                    <button
                        className="action-button update"
                        onClick={() => onUpdate(donation)}
                    >
                        Update
                    </button>
                </>
            )}

            {/* Show Delete button for NGO who claimed the donation after it is completed */}
            {userRole === "ngo" && donation.status === "completed" && donation.claimedBy === userId && (
                <button
                    className="action-button delete"
                    onClick={() => onDelete(donation._id)}
                >
                    Delete
                </button>
            )}

            {userRole === "ngo" && donation.status === "pending" && (
                <button
                    className="action-button claim"
                    onClick={() => onStatusChange(donation._id, "claimed")}
                >
                    Claim
                </button>
            )}
            {userRole === "ngo" && donation.status === "claimed" && (
                <button
                    className="action-button complete"
                    onClick={() => onStatusChange(donation._id, "completed")}
                >
                    Complete
                </button>
            )}
        </div>
    );
};

export default DonationCard;