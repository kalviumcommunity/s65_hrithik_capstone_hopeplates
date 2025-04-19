import { useEffect, useState } from "react"
import RestaurantCard from "../components/RestaurantCard"

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/restaurants")
                const data = await response.json()
                setRestaurants(data)
            } catch (error) {
                console.error("Error fetching restaurants:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchRestaurants()
    }, [])

    return (
        <div className="container">
            <h1>Restaurants</h1>
            {loading ? (
                <div className="loading">Loading restaurants</div>
            ) : (
                <div className="card-grid">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Restaurants