import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui";

const Donations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialType = queryParams.get('type') || 'all';

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(initialType);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);

            // If donor, don't fetch donations
            if (user.role === 'donor') {
                setLoading(false);
                return;
            }
        }

        const fetchDonations = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                // Fetch from REAL API
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donations`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()

                if (!res.ok) throw new Error("Failed to fetch")

                // Filter logic
                const filteredData = filter === 'all'
                    ? data
                    : data.filter(d => d.type.toLowerCase() === filter.toLowerCase());

                setDonations(filteredData);
                setLoading(false);
            } catch (err) {
                console.error(err)
                setLoading(false)
                // Fallback or empty state
            }
        }
        fetchDonations()
    }, [filter]);

    // Update filter if URL changes
    useEffect(() => {
        const typeNode = queryParams.get('type');
        if (typeNode && typeNode !== filter) {
            setFilter(typeNode);
        }
    }, [location.search]);

    const handleMessage = (donor) => {
        navigate('/messages', { state: { chatWith: donor } });
    }

    // Role-based Access Check
    if (currentUser?.role === 'donor') {
        return (
            <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
                <div className="max-w-md bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Thank You for Donating!</h2>
                    <p className="text-neutral-400 mb-8">
                        As a donor, this page is restricted. You can view, track, and manage all your contributions in your Donation History.
                    </p>
                    <Link to="/donation-history" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-500 transition-colors inline-block w-full">
                        View My History
                    </Link>
                </div>
            </div>
        )
    }

    const [claimedDetails, setClaimedDetails] = useState(null);

    const handleClaim = async (donationId) => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        if (!window.confirm("Are you sure you want to claim this donation?")) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donations/${donationId}/claim`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to claim");

            // Update local state to reflect change immediately
            setDonations(prev => prev.map(d => d._id === donationId ? { ...d, status: 'claimed' } : d));

            // Show details
            setClaimedDetails(data);
        } catch (err) {
            console.error("Claim error:", err);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-transparent text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Active Donations</h1>
                        <p className="text-neutral-400 text-lg">Real-time listings from our community.</p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {['all', 'food', 'clothes', 'money', 'books'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium capitalize transition-all whitespace-nowrap backdrop-blur-md ${filter === type
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 border border-white/5'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[400px] bg-white/5 rounded-[32px] border border-white/5"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Make Donation CTA Card */}
                        <div onClick={() => {
                            if (currentUser) {
                                navigate("/make-donation");
                            } else {
                                navigate("/login");
                            }
                        }} className="group bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[400px]">
                            <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">add</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Create Listing</h3>
                            <p className="text-neutral-400 max-w-xs">Have surplus food or items? Share it now.</p>
                        </div>

                        {donations.length === 0 ? (
                            <div className="col-span-full text-center text-neutral-500 py-20">
                                <p>No active donations found for this category.</p>
                            </div>
                        ) : (
                            donations.map(donation => (
                                <div key={donation._id} className="glass-dark rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-300 flex flex-col group h-full">
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity group-hover:opacity-80"></div>
                                        <img
                                            src={donation.images && donation.images.length > 0 ? `${import.meta.env.VITE_API_URL}/${donation.images[0].replace(/\\/g, '/')}` : "https://via.placeholder.com/400x200"}
                                            alt={donation.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <Badge className="bg-white/10 backdrop-blur-md text-white border-none capitalize">{donation.type}</Badge>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-white line-clamp-1">{donation.title}</h3>
                                            <span className="text-sm font-semibold text-blue-400 whitespace-nowrap ml-2">{donation.quantity}</span>
                                        </div>
                                        <p className="text-neutral-400 text-sm mb-6 line-clamp-2 flex-grow">{donation.description}</p>

                                        <div className="flex items-center gap-2 text-neutral-500 text-sm mt-auto pt-6 border-t border-white/5 mb-4">
                                            <span className="material-symbols-outlined text-lg">location_on</span>
                                            <span className="truncate">{donation.pickupLocation || donation.location || "Location not specified"}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-auto">
                                            {donation.status === 'claimed' ? (
                                                <div className="col-span-2 bg-green-500/20 text-green-400 py-3 rounded-xl text-center font-bold border border-green-500/30">
                                                    Claimed
                                                </div>
                                            ) : (
                                                <button
                                                    className="py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
                                                    onClick={() => handleClaim(donation._id)}
                                                >
                                                    Claim
                                                </button>
                                            )}

                                            {donation.donor && currentUser && donation.donor._id !== currentUser.id && (
                                                <button
                                                    onClick={() => handleMessage(donation.donor)}
                                                    className="py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined text-lg">chat</span>
                                                    Message
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>


            {/* Claim Success Modal */}
            {
                claimedDetails && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
                            <button
                                onClick={() => setClaimedDetails(null)}
                                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>

                            <h2 className="text-2xl font-bold text-center mb-2">Claim Successful!</h2>
                            <p className="text-neutral-400 text-center mb-8">You have successfully claimed this donation.</p>

                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3">Donor Details</h3>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {claimedDetails.donor?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{claimedDetails.donor?.name}</p>
                                            <p className="text-sm text-neutral-400">{claimedDetails.donor?.email}</p>
                                        </div>
                                    </div>
                                    {claimedDetails.donor?.contact && (
                                        <div className="flex items-center gap-2 text-sm text-neutral-300 mt-2">
                                            <span className="material-symbols-outlined text-base">call</span>
                                            {claimedDetails.donor.contact}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3">Pickup Location</h3>
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-red-400 mt-0.5">location_on</span>
                                        <div>
                                            <p className="text-white font-medium mb-2">{claimedDetails.pickupLocation || claimedDetails.location || "Contact donor for location"}</p>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(claimedDetails.pickupLocation || claimedDetails.location || "")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 text-sm hover:underline flex items-center gap-1"
                                            >
                                                View on Google Maps
                                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleMessage(claimedDetails.donor)}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 mt-2"
                                >
                                    <span className="material-symbols-outlined">chat</span>
                                    Chat with Donor
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Donations;