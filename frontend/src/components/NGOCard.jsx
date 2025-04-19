const NGOCard = ({ ngo }) => {
    return (
        <div className="card ngo-card">
            <h3>{ngo.name}</h3>
            <p>Email: {ngo.email}</p>
            <p>Location: {ngo.location}</p>
            <p>Verification Status: <span className={`status-badge ${ngo.verificationStatus.toLowerCase() === "verified" ? "status-verified" : "status-pending"}`}>{ngo.verificationStatus}</span></p>
        </div>
    )
}

export default NGOCard