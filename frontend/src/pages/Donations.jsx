import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Badge } from "../components/ui";

const Donations = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const typeFilter = queryParams.get('type');

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(typeFilter || 'all');

    useEffect(() => {
        const fetchDonations = async () => {
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
                    ];
                    setDonations(filter === 'all' ? mockData : mockData.filter(d => d.type === filter));
                    setLoading(false);
                }, 800)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        fetchDonations()
    }, [filter])

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
                                            </span>
                </div>
                <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2 truncate">{donation.title}</h3>
                <p className="text-[#86868B] font-medium">{donation.quantity || donation.amount ? `$${donation.amount}` : ''}</p>
                <p className="text-sm text-[#86868B] mt-2 line-clamp-2">{donation.description}</p>
            </div>

            <div className="pt-6 mt-auto border-t border-[#F5F5F7] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-[#86868B]">Tap to view details</span>
                <button className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F]">
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
            </div>
        </div>
    )
})}
                </div >
            </div >
        </div >
    );
};

export default Donations;