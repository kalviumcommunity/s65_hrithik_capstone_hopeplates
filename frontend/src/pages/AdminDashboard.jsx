import { useEffect, useState } from "react"

const AdminDashboard = () => {
    const [pendingUsers, setPendingUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPendingVerifications = async () => {
            const token = localStorage.getItem("token")
            try {
                const response = await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/admin/pending-verifications", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message)
                }
                const data = await response.json()
                console.log("pendingUsers response:", data.pendingUsers)
                setPendingUsers(data.pendingUsers)
            } catch (err) {
                console.error("Error fetching pending verifications:", err.message)
                alert(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPendingVerifications()
    }, [])

    const handleVerify = async (id) => {
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/admin/verify/user/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            alert("User verified successfully!")
            setPendingUsers((prev) => prev.filter((user) => user._id !== id))
        } catch (err) {
            console.error("Error verifying user:", err.message)
            alert(err.message)
        }
    }

    const handleReject = async (id) => {
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`https://s65-hrithik-capstone-hopeplates.onrender.com/api/admin/reject/user/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            alert("User rejected and deleted successfully!")
            setPendingUsers((prev) => prev.filter((user) => user._id !== id))
        } catch (err) {
            console.error("Error rejecting user:", err.message)
            alert(err.message)
        }
    }

    const formatDate = (dateStr) => {
        try {
            return new Date(dateStr).toLocaleDateString()
        } catch (e) {
            return dateStr
        }
    }

    const imageUrl = (path) => {
        if (!path) return null
        // normalize backslashes
        let p = path.replace(/\\/g, "/")
        // If full absolute path was stored (e.g., C:/.../uploads/...), extract from the 'uploads/' segment
        const uploadsIndex = p.indexOf("uploads/")
        if (uploadsIndex !== -1) {
            p = p.slice(uploadsIndex)
        }
        // remove any leading slashes
        p = p.replace(/(^\/+)/, "")
        return `https://s65-hrithik-capstone-hopeplates.onrender.com/${p}`
    }

    if (loading) return <p>Loading pending verifications...</p>

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Pending Verifications</h2>

            {pendingUsers.length === 0 ? (
                <p>No pending verifications</p>
            ) : (
                <ul>
                    {pendingUsers.map((user) => (
                        <li key={user._id} style={{ marginBottom: 30 }}>
                            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                                <div>
                                    <strong>Name:</strong> {user.name} <br />
                                    <strong>Role:</strong> {user.role} <br />
                                    <strong>Email:</strong> {user.email} <br />
                                    <strong>Location:</strong> {user.location} <br />
                                    <strong>Registered:</strong> {user.createdAt ? formatDate(user.createdAt) : "-"}
                                </div>

                                <div style={{ display: "flex", gap: 10 }}>
                                    {user.profilePhoto && (
                                        <div style={{ textAlign: "center" }}>
                                            <div>Profile</div>
                                                <img
                                                    src={imageUrl(user.profilePhoto)}
                                                    alt={`${user.name} profile`}
                                                    style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%", border: "1px solid #ccc" }}
                                                />
                                                <div style={{ fontSize: 12, marginTop: 4 }}>
                                                    <a href={imageUrl(user.profilePhoto)} target="_blank" rel="noreferrer">Open profile image</a>
                                                </div>
                                        </div>
                                    )}

                                    {user.images && user.images.length > 0 && (
                                        <div style={{ textAlign: "center" }}>
                                            <div>About</div>
                                            <img
                                                src={imageUrl(user.images[0])}
                                                alt={`${user.name} about`}
                                                style={{ width: 120, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #ccc" }}
                                            />
                                            <div style={{ fontSize: 12, marginTop: 4 }}>
                                                <a href={imageUrl(user.images[0])} target="_blank" rel="noreferrer">Open about image</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginTop: 10 }}>
                                <button
                                    onClick={() => handleVerify(user._id)}
                                    className="action-button verify"
                                >
                                    Verify
                                </button>
                                <button
                                    onClick={() => handleReject(user._id)}
                                    className="action-button reject"
                                    style={{ marginLeft: 8 }}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AdminDashboard