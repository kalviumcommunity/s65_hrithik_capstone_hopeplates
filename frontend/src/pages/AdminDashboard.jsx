import { useEffect, useState } from "react"

const AdminDashboard = () => {
    const [pendingUsers, setPendingUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPendingVerifications = async () => {
            const token = localStorage.getItem("token")
            try {
                const response = await fetch("http://localhost:5000/api/admin/pending-verifications", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message)
                }
                const data = await response.json()
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
            const response = await fetch(`http://localhost:5000/api/admin/verify/user/${id}`, {
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
            const response = await fetch(`http://localhost:5000/api/admin/reject/user/${id}`, {
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
                            <strong>Name:</strong> {user.name} <br />
                            <strong>Role:</strong> {user.role} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Location:</strong> {user.location} <br />
                            {user.images && user.images.length > 0 && (
                            <div style={{ display: "flex", gap: 10, margin: "10px 0" }}>
                                {user.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={`http://localhost:5000/${img}`}
                                    alt="user"
                                    style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #ccc" }}
                                />
                                ))}
                            </div>
                            )}
                            <button
                                onClick={() => handleVerify(user._id)}
                                className="action-button verify"
                            >
                                Verify
                            </button>
                            <button
                                onClick={() => handleReject(user._id)}
                                className="action-button reject"
                            >
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AdminDashboard