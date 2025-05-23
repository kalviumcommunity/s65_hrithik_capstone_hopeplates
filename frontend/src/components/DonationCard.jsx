const DonationCard = ({ donation, onDelete, onUpdate, onStatusChange, userId, userRole }) => {
    const isDonor = donation.donor?._id === userId
    return (
        <div className="card donation-card">
            <h3>{donation.type}</h3>
            <p>{donation.description}</p>
            <p>Pickup Location: {donation.pickupLocation}</p>
            <p>Status: <span className={`status-badge ${donation.status.toLowerCase()}`}>{donation.status}</span></p>
            <p>Donor Name: {donation.donor?.name || "Unknown"}</p>
            <p>Donor Role: {donation.donor?.role || "Unknown"}</p>

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
        </div>
    )
}

export default DonationCard;