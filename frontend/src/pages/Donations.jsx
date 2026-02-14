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
            setCurrentUser(JSON.parse(storedUser));
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
        // Create a user object that matches what Messages expects
        // The donations endpoint returns donor populated with { _id, name, email, contact }
        // We might need to ensure consistency, but if it has _id, it should work.
        navigate('/messages', { state: { chatWith: donor } });
    }

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
                        <Link to="/make-donation" className="group bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[400px]">
                            <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">add</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Create Listing</h3>
                            <p className="text-neutral-400 max-w-xs">Have surplus food or items? Share it now.</p>
                        </Link>

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
                                            <button
                                                className="py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
                                                onClick={() => alert("Claim feature coming soon")}
                                            >
                                                Claim
                                            </button>

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
        </div>
    )
}

export default Donations;