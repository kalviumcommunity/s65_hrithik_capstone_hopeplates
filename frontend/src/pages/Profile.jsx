import { useEffect, useState } from "react"

const Profile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token")
            try {
                const response = await fetch("http://localhost:5000/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message)
                }
                const data = await response.json()
                setUser(data)
            } catch (err) {
                console.error("Error fetching profile:", err.message)
                alert(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    if (loading) return <div className="container"><div className="loading">Loading profile</div></div>

    return (
        <div className="container">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Welcome, {user.name}</h1>
                </div>
                <div className="profile-details">
                    <strong>Email:</strong>
                    <span>{user.email}</span>
                    
                    <strong>Location:</strong>
                    <span>{user.location}</span>
                    
                    <strong>Role:</strong>
                    <span>{user.role}</span>
                </div>
            </div>
        </div>
    )
}

export default Profile