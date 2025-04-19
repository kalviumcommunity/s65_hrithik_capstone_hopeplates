const DonationCard = ({ donation }) => {
    return (
        <div className="card donation-card">
            <h3>{donation.type}</h3>
            <p>{donation.description}</p>
            <p>Pickup Location: {donation.pickupLocation}</p>
            <p>Status: <span className={`status-badge ${donation.status.toLowerCase() === "pending" ? "status-pending" : "status-verified"}`}>{donation.status}</span></p>
        </div>
    )
}

export default DonationCard