import { useEffect, useState } from "react"
import NGOCard from "../components/NGOCard"

const NGOs = () => {
    const [ngos, setNgos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNGOs = async () => {
            try {
                const response = await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/ngos")
                const data = await response.json()
                setNgos(data)
            } catch (error) {
                console.error("Error fetching NGOs:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchNGOs()
    }, [])

    return (
        <div className="container">
            <h1>NGOs</h1>
            {loading ? (
                <div className="loading">Loading NGOs</div>
            ) : (
                <div className="card-grid">
                    {ngos.map((ngo) => (
                        <NGOCard key={ngo._id} ngo={ngo} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default NGOs