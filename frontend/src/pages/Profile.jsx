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
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files)
        const formData = new FormData()
        files.forEach(file => formData.append("images", file))
        const token = localStorage.getItem("token")
        await fetch("http://localhost:5000/api/users/upload-images", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        })
        window.location.reload()
    }

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
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {user.images && user.images.map((img, idx) => (
                            <img key={idx} src={`http://localhost:5000/${img}`} alt="profile" style={{ width: 100, borderRadius: 8 }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile