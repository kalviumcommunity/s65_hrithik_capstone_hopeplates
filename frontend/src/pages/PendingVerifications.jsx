import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, User, AlertCircle, Clock } from "lucide-react";

const PendingVerifications = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(null);
    const [rejecting, setRejecting] = useState(null);

    const API_BASE = window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://s65-hrithik-capstone-hopeplates.onrender.com";

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/api/users/pending-verifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setPendingUsers(data.pendingUsers || []);
            }
        } catch (err) {
            console.error("Error fetching pending users:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (userId) => {
        setVerifying(userId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/api/users/verify/${userId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                // Remove from list
                setPendingUsers(prev => prev.filter(u => u._id !== userId));
                alert("User verified successfully!");
            } else {
                alert("Failed to verify user.");
            }
        } catch (err) {
            console.error("Error verifying user:", err);
            alert("Error verifying user.");
        } finally {
            setVerifying(null);
        }
    };

    const handleReject = async (userId) => {
        if (!window.confirm("Are you sure you want to reject and delete this user?")) return;
        setRejecting(userId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/api/users/reject/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                // Remove from list
                setPendingUsers(prev => prev.filter(u => u._id !== userId));
                alert("User rejected and deleted.");
            } else {
                alert("Failed to reject user.");
            }
        } catch (err) {
            console.error("Error rejecting user:", err);
            alert("Error rejecting user.");
        } finally {
            setRejecting(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <Clock className="text-yellow-500" /> Pending Verifications
                </h1>
                <p className="text-neutral-400 mb-8">Review and approve new NGO, Restaurant, and Event Manager accounts.</p>

                {pendingUsers.length === 0 ? (
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-12 text-center">
                        <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
                        <p className="text-neutral-500">There are no pending verifications at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingUsers.map((user) => (
                            <div key={user._id} className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-colors">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold uppercase border border-blue-500/30">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-white">{user.name}</h3>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-medium uppercase border border-white/5">
                                                    {user.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                                            <span className="material-symbols-outlined text-base">location_on</span>
                                            {user.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-neutral-400 truncate" title={user.email}>
                                            <span className="material-symbols-outlined text-base">mail</span>
                                            {user.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-yellow-400">
                                            <span className="material-symbols-outlined text-base">pending</span>
                                            Status: Pending
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            to={`/user/${user._id}`}
                                            className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors text-center flex items-center justify-center"
                                            title="View Profile"
                                        >
                                            <User size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleVerify(user._id)}
                                            disabled={verifying === user._id || rejecting === user._id}
                                            className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {verifying === user._id ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <CheckCircle size={16} /> Approve
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleReject(user._id)}
                                            disabled={verifying === user._id || rejecting === user._id}
                                            className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {rejecting === user._id ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <XCircle size={16} /> Reject
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingVerifications;
