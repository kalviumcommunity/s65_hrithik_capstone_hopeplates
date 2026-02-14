import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Badge } from "../components/ui";

const DonationHistory = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Dynamic API URL handling
    const API_BASE = window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://s65-hrithik-capstone-hopeplates.onrender.com";

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const user = JSON.parse(atob(token.split(".")[1]));
                setCurrentUser(user);

                const res = await fetch(`${API_BASE}/api/donations/history`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch history");
                }

                if (!Array.isArray(data)) {
                    setError("Unexpected response format");
                    setDonations([]);
                } else {
                    setDonations(data);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch donation history");
                setDonations([]);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [navigate, API_BASE]);

    const handleComplete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_BASE}/api/donations/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "completed" }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            setDonations((prev) =>
                prev.map((donation) =>
                    donation._id === id
                        ? { ...donation, status: "completed" }
                        : donation
                )
            );
        } catch (err) {
            alert("Failed to mark as completed");
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/50';
            case 'claimed': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            default: return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/50';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-transparent text-white">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Donation History</h1>
                    <p className="text-neutral-400 text-lg">Track your contributions and claimed items.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl mb-8">
                        {error}
                    </div>
                )}

                {donations.length === 0 && !error ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                        <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-500">
                            <span className="material-symbols-outlined text-3xl">history</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No history yet</h3>
                        <p className="text-neutral-400 mb-6">You haven't made or claimed any donations yet.</p>
                        {currentUser?.role === 'donor' && (
                            <Link to="/make-donation" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-500 transition-colors">
                                <span className="material-symbols-outlined">add_circle</span>
                                Make a Donation
                            </Link>
                        )}
                        {currentUser?.role !== 'donor' && (
                            <Link to="/donations" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-500 transition-colors">
                                <span className="material-symbols-outlined">volunteer_activism</span>
                                Browse Donations
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {donations.map((donation) => {
                            const isDonor = donation.donor?._id === currentUser?.id || donation.donor === currentUser?.id;
                            const isClaimant = donation.claimedBy?._id === currentUser?.id || donation.claimedBy === currentUser?.id;

                            return (
                                <div key={donation._id} className="glass-dark p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group flex flex-col md:flex-row gap-6">
                                    {/* Image */}
                                    <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-black/50 flex-shrink-0">
                                        <img
                                            src={donation.images && donation.images.length > 0 ? `${API_BASE}/${donation.images[0].replace(/\\/g, '/')}` : "https://via.placeholder.com/200?text=No+Image"}
                                            alt={donation.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Badge className={`mb-2 ${getStatusColor(donation.status)} uppercase tracking-wider text-[10px]`}>
                                                    {donation.status}
                                                </Badge>
                                                <h3 className="text-xl font-bold text-white">{donation.title}</h3>
                                            </div>
                                            <span className="text-sm font-mono text-neutral-500">
                                                {new Date(donation.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{donation.description}</p>

                                        {/* Meta Data */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto bg-black/20 p-4 rounded-xl">

                                            {/* Role-specific view: If I am donor, show who claimed it */}
                                            {isDonor && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                                        <span className="material-symbols-outlined text-sm">handshake</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-neutral-500 uppercase font-bold">Claimed By</p>
                                                        {donation.claimedBy ? (
                                                            <Link to={`/user/${donation.claimedBy._id}`} className="text-sm font-semibold text-blue-400 hover:text-blue-300 truncate block max-w-[150px]">
                                                                {donation.claimedBy.name || "Unknown NGO"}
                                                            </Link>
                                                        ) : (
                                                            <p className="text-sm font-semibold text-neutral-400 italic">Not claimed yet</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* If I am claimant, show who donated it */}
                                            {isClaimant && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                        <span className="material-symbols-outlined text-sm">person_heart</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-neutral-500 uppercase font-bold">Donated By</p>
                                                        {donation.donor ? (
                                                            <Link to={donation.donor._id === currentUser.id ? "/profile" : `/user/${donation.donor._id}`} className="text-sm font-semibold text-blue-400 hover:text-blue-300 truncate block max-w-[150px]">
                                                                {donation.donor.name || "Anonymous"}
                                                            </Link>
                                                        ) : (
                                                            <p className="text-sm font-semibold text-white">Unknown</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-neutral-400">
                                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase font-bold">Pickup</p>
                                                    <p className="text-sm font-semibold text-white truncate max-w-[150px]" title={donation.pickupLocation}>
                                                        {donation.pickupLocation || "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-4 flex justify-end gap-3">
                                            {donation.status === "claimed" && isClaimant && (
                                                <button
                                                    onClick={() => handleComplete(donation._id)}
                                                    className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-500 transition-colors shadow-lg shadow-green-900/20"
                                                >
                                                    Confirm Receipt
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationHistory;