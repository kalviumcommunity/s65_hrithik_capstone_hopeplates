import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "../components/ui";

const Donations = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialType = queryParams.get('type') || 'all';

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(initialType);

    useEffect(() => {
        const fetchDonations = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donations?type=${filter}`)
                // const data = await res.json()

                // SIMULATED DATA for "Dynamic" feel if backend empty
                setTimeout(() => {
                    const mockData = [
                        { _id: '1', title: 'Surplus Bread & Pastries', type: 'food', description: 'Fresh loaves from daily bake.', quantity: '15kg', location: 'Downtown Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop' },
                        { _id: '2', title: 'Winter Jackets Batch', type: 'clothes', description: 'Assorted sizes, gently used.', quantity: '50 items', location: 'Community Center', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop' },
                        { _id: '3', title: 'Canned Goods Request', type: 'food', description: 'Urgent need for shelter pantry.', quantity: '100 cans', location: 'Hope Shelter', image: 'https://images.unsplash.com/photo-1534483509522-3c87c0e86b64?q=80&w=2070&auto=format&fit=crop' },
                        { _id: '4', title: 'Math Textbooks', type: 'books', description: 'High school level calculus books.', quantity: '30 books', location: 'City Library Drop', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop' },
                        { _id: '5', title: 'Emergency Fund', type: 'money', description: 'Medical aid for local families.', quantity: '$500 goal', location: 'Red Cross', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop' },
                    ];

                    const filteredData = filter === 'all'
                        ? mockData
                        : mockData.filter(d => d.type.toLowerCase() === filter.toLowerCase());

                    setDonations(filteredData);
                    setLoading(false);
                }, 800)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        fetchDonations()
    }, [filter])

    // Update filter if URL changes (back/forward navigation)
    useEffect(() => {
        const typeNode = queryParams.get('type');
        if (typeNode && typeNode !== filter) {
            setFilter(typeNode);
        }
    }, [location.search]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-black text-white">
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
                                className={`px-6 py-2.5 rounded-full text-sm font-medium capitalize transition-all whitespace-nowrap ${filter === type
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                                        : 'bg-zinc-900 text-neutral-400 hover:bg-zinc-800 border border-white/5'
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
                            <div key={i} className="h-[400px] bg-zinc-900 rounded-[32px] border border-white/5"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Make Donation CTA Card */}
                        <Link to="/make-donation" className="group bg-zinc-900/50 rounded-[32px] p-8 border border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[400px]">
                            <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">add</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Create Listing</h3>
                            <p className="text-neutral-400 max-w-xs">Have surplus food or items? Share it now.</p>
                        </Link>

                        {donations.map(donation => (
                            <div key={donation._id} className="bg-zinc-900 rounded-[32px] overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity group-hover:opacity-80"></div>
                                    <img src={donation.image} alt={donation.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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

                                    <div className="flex items-center gap-2 text-neutral-500 text-sm mt-auto pt-6 border-t border-white/5">
                                        <span className="material-symbols-outlined text-lg">location_on</span>
                                        <span className="truncate">{donation.location}</span>
                                    </div>

                                    <button className="w-full mt-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors" onClick={() => alert("Claim feature coming soon")}>
                                        Claim
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Donations;