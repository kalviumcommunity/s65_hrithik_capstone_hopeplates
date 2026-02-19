import { useEffect, useState } from "react"
import { Link } from "react-router-dom"; // Import Link for Profile navigation

const AdminDashboard = () => {
    const [pendingUsers, setPendingUsers] = useState([])
    const [loading, setLoading] = useState(true)

    // Dynamic API URL
    const API_BASE = window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://s65-hrithik-capstone-hopeplates.onrender.com";

    useEffect(() => {
        const fetchPendingVerifications = async () => {
            const token = localStorage.getItem("token")
            try {
                // Using API_BASE and mapped endpoint
                const response = await fetch(`${API_BASE}/api/users/pending-verifications`, {
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
                // alert(err.message) // Optional: Alert on dashboard load might be annoying if just empty result?
            } finally {
                setLoading(false)
            }
        }
        fetchPendingVerifications()
    }, [])

    const handleVerify = async (id) => {
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`${API_BASE}/api/users/verify/${id}`, {
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
        if (!window.confirm("Are you sure you want to reject and delete this user?")) return;
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`${API_BASE}/api/users/reject/${id}`, {
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
        // Normalize
        let p = path.replace(/\\/g, "/")
        // Fix double uploads prefix if present
        if (p.includes("uploads/")) {
            // Usually API_BASE + path is enough if path is relative
            // But if path includes 'uploads/' we just need to ensure we don't duplicate
            // Assuming path is like 'uploads/user_images/...'
        }
        return `${API_BASE}/${p}`
    }

    if (loading) return (
        <div className="flex justify-center p-8"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
    );

    return (
        <div className="bg-black text-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-neutral-400">Pending Verifications</h2>

            {/* Link to Dedicated Page */}
            <div className="mb-6">
                <Link to="/pending-verifications" className="text-blue-400 hover:underline">
                    View Full Verification Page
                </Link>
            </div>

            {pendingUsers.length === 0 ? (
                <div className="text-neutral-500">No pending verifications</div>
            ) : (
                <ul className="space-y-6">
                    {pendingUsers.map((user) => (
                        <li key={user._id} className="bg-zinc-900 border border-white/10 p-6 rounded-xl">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div className="text-white font-bold text-lg mb-2 col-span-2">{user.name}</div>
                                        <div><strong className="text-neutral-500">Role:</strong> {user.role}</div>
                                        <div><strong className="text-neutral-500">Email:</strong> {user.email}</div>
                                        <div><strong className="text-neutral-500">Location:</strong> {user.location}</div>
                                        <div><strong className="text-neutral-500">Registered:</strong> {user.createdAt ? formatDate(user.createdAt) : "-"}</div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    {user.profilePhoto && (
                                        <div className="text-center">
                                            <div className="text-xs text-neutral-500 mb-1">Profile</div>
                                            <a href={imageUrl(user.profilePhoto)} target="_blank" rel="noreferrer" className="block w-20 h-20 rounded-full overflow-hidden border border-white/20">
                                                <img
                                                    src={imageUrl(user.profilePhoto)}
                                                    alt={`${user.name} profile`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </a>
                                        </div>
                                    )}

                                    {user.images && user.images.length > 0 && (
                                        <div className="text-center">
                                            <div className="text-xs text-neutral-500 mb-1">About Img</div>
                                            <a href={imageUrl(user.images[0])} target="_blank" rel="noreferrer" className="block w-24 h-20 rounded-lg overflow-hidden border border-white/20">
                                                <img
                                                    src={imageUrl(user.images[0])}
                                                    alt={`${user.name} about`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => handleVerify(user._id)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-green-900/20"
                                >
                                    Verify
                                </button>
                                <button
                                    onClick={() => handleReject(user._id)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-red-900/20"
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