import { useEffect, useState } from "react"

const Profile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        location: ""
    })
    const [profilePhotoFile, setProfilePhotoFile] = useState(null)
    const [aboutImages, setAboutImages] = useState([])

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token")
            try {
                const response = await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message)
                }
                const data = await response.json()
                setUser(data)
                setEditData({
                    name: data.name,
                    email: data.email,
                    location: data.location
                })
            } catch (err) {
                console.error("Error fetching profile:", err.message)
                alert(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleEdit = () => setEditMode(true)
    const handleCancel = () => {
        setEditMode(false)
        setProfilePhotoFile(null)
        setAboutImages([])
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editData)
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }

            if (profilePhotoFile) {
                const formData = new FormData()
                formData.append("profilePhoto", profilePhotoFile)
                await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/upload-profile-photo", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData
                })
            }

            if (aboutImages.length > 0) {
                const formData = new FormData()
                aboutImages.forEach(file => formData.append("images", file))
                await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/upload-images", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData
                })
            }
            setEditMode(false)
            window.location.reload()
        } catch (err) {
            console.error("Error updating profile:", err.message)
            alert(err.message)
        }
    }

    const handleDeleteProfilePhoto = async () => {
        const token = localStorage.getItem("token")
        await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/delete-profile-photo", {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        window.location.reload()
    }

    const handleDeleteAboutImage = async (imgPath) => {
        const token = localStorage.getItem("token")
        await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/delete-about-image", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ imagePath: imgPath })
        })
        setUser(prev => ({
            ...prev,
            images: prev.images.filter(img => img !== imgPath)
        }))
    }

    if (loading) return <div className="container"><div className="loading">Loading profile</div></div>

    return (
        <div className="container">
            <div className="profile-container">
                <div className="profile-header" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <h1 style={{ margin: 0 }}>Welcome, {user.name}</h1>
                    {user.profilePhoto && (
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${user.profilePhoto}`}
                                alt="profile"
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    border: "2px solid #ccc",
                                    objectFit: "cover"
                                }}
                            />
                            {editMode && (
                                <span
                                    onClick={handleDeleteProfilePhoto}
                                    style={{
                                        position: "absolute",
                                        top: -8,
                                        right: -8,
                                        background: "#fff",
                                        borderRadius: "50%",
                                        border: "1px solid #ccc",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        color: "#d00",
                                        width: 20,
                                        height: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    title="Delete profile photo"
                                >✖</span>
                            )}
                        </div>
                    )}
                </div>
                <div className="profile-details">
                    {editMode ? (
                        <form onSubmit={handleUpdate} style={{ width: "100%" }}>
                            <strong>Name:</strong>
                            <input
                                type="text"
                                value={editData.name}
                                onChange={e => setEditData({ ...editData, name: e.target.value })}
                                required
                            />
                            <strong>Email:</strong>
                            <input
                                type="email"
                                value={editData.email}
                                onChange={e => setEditData({ ...editData, email: e.target.value })}
                                required
                            />
                            <strong>Location:</strong>
                            <input
                                type="text"
                                value={editData.location}
                                onChange={e => setEditData({ ...editData, location: e.target.value })}
                                required
                            />
                            <strong>Profile Photo:</strong>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setProfilePhotoFile(e.target.files[0])}
                            />
                            <strong>About Images:</strong>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={e => setAboutImages(Array.from(e.target.files))}
                            />
                            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 10 }}>
                                {user.images && user.images.map((img, idx) => (
                                    <div key={idx} style={{ position: "relative", display: "inline-block" }}>
                                        <img
                                            src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${img}`}
                                            alt="about"
                                            style={{ width: 220, height: 220, borderRadius: 16, border: "2px solid #ccc", objectFit: "cover" }}
                                        />
                                        <span
                                            onClick={() => handleDeleteAboutImage(img)}
                                            style={{
                                                position: "absolute",
                                                top: -8,
                                                right: -8,
                                                background: "#fff",
                                                borderRadius: "50%",
                                                border: "1px solid #ccc",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                                color: "#d00",
                                                width: 28,
                                                height: 28,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 20
                                            }}
                                            title="Delete image"
                                        >✖</span>
                                    </div>
                                ))}
                                {aboutImages.length > 0 && aboutImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={URL.createObjectURL(img)}
                                        alt="about preview"
                                        style={{ width: 220, height: 220, borderRadius: 16, border: "2px solid #ccc", objectFit: "cover" }}
                                    />
                                ))}
                            </div>
                            <button type="submit" style={{ marginRight: 10 }}>Save</button>
                            <button type="button" onClick={handleCancel}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <strong>Email:</strong>
                            <span>{user.email}</span>
                            <strong>Location:</strong>
                            <span>{user.location}</span>
                            <strong>Role:</strong>
                            <span>{user.role}</span>
                            <button onClick={handleEdit} style={{ marginTop: 10 }}>Edit Profile</button>
                            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 10 }}>
                                {user.images && user.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={`https://s65-hrithik-capstone-hopeplates.onrender.com/${img}`}
                                        alt="about"
                                        style={{ width: 220, height: 220, borderRadius: 16, border: "2px solid #ccc", objectFit: "cover" }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile