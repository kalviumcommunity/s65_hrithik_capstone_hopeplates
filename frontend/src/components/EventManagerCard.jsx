const EventManagerCard = ({ eventManager }) => {
    return (
        <div className="card event-manager-card">
            <h3>{eventManager.name}</h3>
            <p>Email: {eventManager.email}</p>
            <p>Location: {eventManager.location}</p>
            <p>Contact: {eventManager.contactNumber}</p>
            <p>Verification Status: <span className={`status-badge ${eventManager.verificationStatus.toLowerCase() === "verified" ? "status-verified" : "status-pending"}`}>{eventManager.verificationStatus}</span></p>
        </div>
    )
}
export default EventManagerCard