const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="card restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>Email: {restaurant.email}</p>
            <p>Location: {restaurant.location}</p>
            <p>Contact: {restaurant.contactNumber}</p>
            <p>Verification Status: <span className={`status-badge ${restaurant.verificationStatus.toLowerCase() === "verified" ? "status-verified" : "status-pending"}`}>{restaurant.verificationStatus}</span></p>
        </div>
    )
}

export default RestaurantCard