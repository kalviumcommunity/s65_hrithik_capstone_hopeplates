import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Badge } from "../components/ui";
import DonationImage from "../components/DonationImage";

const Donations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialType = queryParams.get('type') || 'all';

    const [currentUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    if (currentUser && !['ngo', 'admin'].includes(currentUser.role)) {
        return <Navigate to="/" replace />;
    }

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(initialType);

    useEffect(() => {
        const fetchDonations = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donations`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();

                if (!res.ok) throw new Error("Failed to fetch");

                const filteredData = filter === 'all'
                    ? data
                    : data.filter(d => d.type.toLowerCase() === filter.toLowerCase());

                setDonations(filteredData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchDonations();
    }, [filter]);

    useEffect(() => {
        const typeNode = queryParams.get('type');
        if (typeNode && typeNode !== filter) {
            setFilter(typeNode);
        }
    }, [location.search]);

    const handleMessage = (donor) => {
        navigate('/messages', { state: { chatWith: donor } });
    };

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

            setDonations(prev => prev.map(d => d._id === donationId ? { ...d, status: 'claimed' } : d));
            setClaimedDetails(data);
        } catch (err) {
            console.error("Claim error:", err);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen pt-4 pb-20 px-4 md:px-8 bg-transparent text-white animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        {/* Title removed to avoid repetition with Layout Header */}
                    </div>

                    <div className="glass-light p-1.5 rounded-full flex gap-1 overflow-x-auto">
                        {['all', 'food', 'clothes', 'money', 'books'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all duration-300 ${filter === type
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-neutral-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[400px] bg-white/5 rounded-[32px] animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* CTA Card */}
                        <div
                            onClick={() => navigate(currentUser ? "/make-donation" : "/login")}
                            className="glass-card flex flex-col items-center justify-center text-center p-8 cursor-pointer border-dashed border-2 border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 group"
                        >
                            <div className="w-20 h-20 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-blue-500/10">
                                <span className="material-symbols-outlined text-4xl">add</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Create Listing</h3>
                            <p className="text-neutral-400 max-w-xs">Have surplus food or items? Share it now.</p>
                        </div>

                        {donations.length === 0 ? (
                            <div className="col-span-full text-center text-neutral-500 py-20">
                                <span className="material-symbols-outlined text-6xl opacity-20 mb-4">search_off</span>
                                <p className="text-xl">No active donations found for this category.</p>
                            </div>
                        ) : (
                            donations.map(donation => (
                                <div key={donation._id} className="glass-card overflow-hidden flex flex-col h-full group">
                                    <div className="h-56 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                        <DonationImage
                                            images={donation.images}
                                            type={donation.type}
                                            title={donation.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <Badge className="bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold capitalize px-3 py-1">
                                                {donation.type}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-white line-clamp-1">{donation.title}</h3>
                                            <span className="text-sm font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">
                                                {donation.quantity}
                                            </span>
                                        </div>

                                        <p className="text-neutral-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                                            {donation.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-neutral-500 text-xs font-bold uppercase tracking-wider mb-6">
                                            <span className="material-symbols-outlined text-lg">location_on</span>
                                            <span className="truncate">{donation.pickupLocation || donation.location || "Location not specified"}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-auto">
                                            {donation.status === 'claimed' ? (
                                                <div className="col-span-2 bg-green-500/20 text-green-400 py-3 rounded-xl text-center font-bold border border-green-500/30 flex items-center justify-center gap-2">
                                                    <span className="material-symbols-outlined">check_circle</span> Claimed
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn-primary py-3 w-full flex items-center justify-center gap-2"
                                                    onClick={() => handleClaim(donation._id)}
                                                >
                                                    Claim
                                                </button>
                                            )}

                                            {donation.donor && currentUser && donation.donor._id !== currentUser.id && (
                                                <button
                                                    onClick={() => handleMessage(donation.donor)}
                                                    className="btn-glass py-3 w-full flex items-center justify-center gap-2 text-sm hover:bg-white/10"
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
            {claimedDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="glass-dark border border-white/10 rounded-[40px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-400">
                        <button
                            onClick={() => setClaimedDetails(null)}
                            className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>

                        <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                            <span className="material-symbols-outlined text-4xl text-white">check</span>
                        </div>

                        <h2 className="text-3xl font-bold text-center mb-2 text-white">Claim Successful!</h2>
                        <p className="text-neutral-400 text-center mb-8">You have successfully claimed this donation.</p>

                        <div className="space-y-4">
                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Donor Details</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        {claimedDetails.donor?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">{claimedDetails.donor?.name}</p>
                                        <p className="text-sm text-neutral-400">{claimedDetails.donor?.email}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleMessage(claimedDetails.donor)}
                                className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 mt-4"
                            >
                                <span className="material-symbols-outlined">chat</span>
                                Chat with Donor
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Donations;