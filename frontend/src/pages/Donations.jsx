import { useEffect, useState } from "react"
import DonationCard from "../components/DonationCard"

const Donations = () => {
    const [donations, setDonations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/donations")
                const data = await response.json()
                setDonations(data)
            } catch (error) {
                console.error("Error fetching donations:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchDonations()
    }, [])

    return (
        <div className="container">
            <h1>Donations</h1>
            {loading ? (
                <div className="loading">Loading donations</div>
            ) : (
                <div className="card-grid">
                    {donations.map((donation) => (
                        <DonationCard key={donation._id} donation={donation} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Donations