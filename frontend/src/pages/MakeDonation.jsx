import { useState } from "react"
import { useNavigate } from "react-router-dom"

const MakeDonation = () => {
    const [formData, setFormData] = useState({
        type: "food",
        description: "",
        pickupLocation: "",
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        try {
            const response = await fetch("http://localhost:5000/api/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData), 
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            alert("Donation created successfully!")
            navigate("/donations")
        } catch (err) {
            console.error("Error creating donation:", err.message)
            alert(err.message)
        }
    }

    return (
        <div className="container">
            <h1>Make a Donation</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Type:
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="food">Food</option>
                        <option value="books">Books</option>
                        <option value="clothes">Clothes</option>
                    </select>
                </label>
                <label>
                    Description:
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Pickup Location:
                    <input
                        type="text"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default MakeDonation