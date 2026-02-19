import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DonationImage from '../../components/DonationImage';

const NGODashboard = ({ user }) => {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        activeClaims: 0,
        pendingPickups: 0,
        mealsDistributed: 1402, // Mock for now
        volunteersOnline: 12
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donations`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();

                    // Filter for available donations (pending)
                    const available = data.filter(d => d.status === 'pending');

                    // Calculate "My Active Claims"
                    const myClaims = data.filter(d => d.status === 'claimed' && d.claimedBy === user._id);

                    setDonations(available);
                    setStats(prev => ({
                        ...prev,
                        activeClaims: myClaims.length,
                        pendingPickups: myClaims.filter(d => !d.pickedUp).length // Assuming pickedUp field exists or just mock logic
                    }));
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user._id]);

    const handleClaim = async (donationId) => {
        if (!window.confirm("Are you sure you want to claim this donation? Priority will be assigned to you.")) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donations/${donationId}/claim`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                // Remove from local state to reflect instant update
                setDonations(prev => prev.filter(d => d._id !== donationId));
                setStats(prev => ({ ...prev, activeClaims: prev.activeClaims + 1 }));
                alert("Donation claimed successfully! accurate pickup details have been sent to your history.");
            } else {
                const err = await res.json();
                alert(err.error || "Failed to claim");
            }
        } catch (error) {
            console.error(error);
            alert("Error claiming donation");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">NGO Command Center</h1>
                    <p className="text-neutral-400">Monitor incoming donations and manage pickups.</p>
                </div>
                <div className="flex gap-4">
                    <Link to="/donations" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg hover:shadow-white/20">
                        <span className="material-symbols-outlined">search</span>
                        Find Food
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6 border-l-4 border-l-blue-500">
                    <p className="text-neutral-400 font-medium text-xs uppercase">Active Claims</p>
                    <h2 className="text-3xl font-bold text-white mt-1">{stats.activeClaims}</h2>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-yellow-500">
                    <p className="text-neutral-400 font-medium text-xs uppercase">Pending Pickups</p>
                    <h2 className="text-3xl font-bold text-white mt-1">{stats.activeClaims}</h2> {/* Using same for now */}
                </div>
                <div className="glass-card p-6 border-l-4 border-l-green-500">
                    <p className="text-neutral-400 font-medium text-xs uppercase">Meals Distributed</p>
                    <h2 className="text-3xl font-bold text-white mt-1">{stats.mealsDistributed}</h2>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-purple-500">
                    <p className="text-neutral-400 font-medium text-xs uppercase">Volunteers Online</p>
                    <h2 className="text-3xl font-bold text-white mt-1">{stats.volunteersOnline}</h2>
                </div>
            </div>

            {/* Live Feed & Map Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Available Donations Feed */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Live Donations Nearby
                    </h3>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : donations.length === 0 ? (
                        <div className="text-center py-10 text-neutral-500">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">check_circle</span>
                            <p>No pending donations nearby.</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-hide">
                            {donations.map((donation) => (
                                <div key={donation._id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                                    <div className="w-full md:w-32 h-32 md:h-24 rounded-lg overflow-hidden relative shrink-0">
                                        <DonationImage
                                            images={donation.images}
                                            type={donation.type}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg text-white truncate">{donation.title}</h4>
                                            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded whitespace-nowrap ml-2">Available</span>
                                        </div>
                                        <p className="text-neutral-400 text-sm mt-1 line-clamp-2">{donation.description}</p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                {new Date(donation.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">inventory_2</span>
                                                {donation.quantity}
                                            </span>
                                            <span className="flex items-center gap-1 truncate max-w-[150px]">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                                {donation.pickupLocation}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-2 md:mt-0">
                                        <button
                                            onClick={() => handleClaim(donation._id)}
                                            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/20"
                                        >
                                            Claim
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Task/Volunteer List */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Urgent Tasks</h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3 items-center p-3 rounded-lg hover:bg-white/5 cursor-pointer">
                            <div className="w-5 h-5 rounded border border-neutral-500"></div>
                            <span className="text-neutral-300 text-sm">Verify new volunteer applications</span>
                        </li>
                        <li className="flex gap-3 items-center p-3 rounded-lg hover:bg-white/5 cursor-pointer">
                            <div className="w-5 h-5 rounded border border-neutral-500"></div>
                            <span className="text-neutral-300 text-sm">Coordinate pickup for Event #33</span>
                        </li>
                        <li className="flex gap-3 items-center p-3 rounded-lg hover:bg-white/5 cursor-pointer">
                            <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-500 text-sm">priority_high</span>
                            </div>
                            <span className="text-white font-medium text-sm">Update inventory logs</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NGODashboard;
