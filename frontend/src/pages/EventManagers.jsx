import { useEffect, useState } from "react"
import EventManagerCard from "../components/EventManagerCard"

const EventManagers = () => {
    const [eventManagers, setEventManagers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEventManagers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/event-managers")
                const data = await response.json()
                setEventManagers(data)
            } catch (error) {
                console.error("Error fetching event managers:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchEventManagers()
    }, [])

    return (
        <div className="container">
            <h1>Event Managers</h1>
            {loading ? (
                <div className="loading">Loading event managers</div>
            ) : (
                <div className="card-grid">
                    {eventManagers.map((eventManager) => (
                        <EventManagerCard key={eventManager._id} eventManager={eventManager} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default EventManagers