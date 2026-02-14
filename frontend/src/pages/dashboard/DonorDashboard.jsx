import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DonorDashboard = ({ user }) => {
    const [stats, setStats] = useState({
        totalDonations: 0,
        impact: 0,
        points: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dynamic API URL handling
    const API_BASE = window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://s65-hrithik-capstone-hopeplates.onrender.com";

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                const token = localStorage.getItem('token');

                // Fetch Count
                const countRes = await fetch(`${API_BASE}/api/donations/count/${user.id || user._id}`);
                let count = 0;
                if (countRes.ok) {
                    const data = await countRes.json();
                    count = data.count || 0;
                }

                // Fetch Recent Donations
                const historyRes = await fetch(`${API_BASE}/api/donations/user/${user.id || user._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                let history = [];
                if (historyRes.ok) {
                    const data = await historyRes.json();
                    // Filter out rejected if needed, or keeping it consistent with Profile which also fetches /user/:id (but profile logic might be slightly different? 
                    // Wait, getDonationsByUser in controller just does find({ donor: userId }).
                    // Profile uses getDonationsByUser too.
                    // The count endpoint filters out rejected. The list endpoint currently returns all.
                    // Let's filter out rejected for display in dashboard to look cleaner, or keep as is.
                    // If count excludes rejected, list should probably visually dim them or exclude them.
                    // Let's exclude rejected from "Activity" list for dashboard "highlights".
                    history = Array.isArray(data) ? data.filter(d => d.status !== 'rejected').slice(0, 3) : [];
                }

                setStats({
                    totalDonations: count,
                    impact: count * 5, // Mock calculation: 5 meals per donation
                    points: count * 50 // Mock calculation: 50 points per donation
                });
                setRecentActivity(history);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, API_BASE]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/20';
            case 'claimed': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
            case 'verified': return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
            default: return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/20';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hello, {user?.name || 'Hero'}! 👋</h1>
                    <p className="text-neutral-400">Thank you for making a difference today.</p>
                </div>
                <Link to="/make-donation" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg hover:shadow-white/20">
                    <span className="material-symbols-outlined">add_circle</span>
                    Make a Donation
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
                    <div>
                        <p className="text-neutral-400 font-medium text-sm uppercase tracking-wider">Total Donations</p>
                        <h2 className="text-4xl font-bold text-white mt-2">{stats.totalDonations}</h2>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
                    <div>
                        <p className="text-neutral-400 font-medium text-sm uppercase tracking-wider">Impact Made</p>
                        <h2 className="text-4xl font-bold text-white mt-2">{stats.impact}</h2>
                        <p className="text-sm text-neutral-500">Meals provided (est.)</p>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-all"></div>
                    <div>
                        <p className="text-neutral-400 font-medium text-sm uppercase tracking-wider">Points Earned</p>
                        <h2 className="text-4xl font-bold text-white mt-2">{stats.points}</h2>
                    </div>
                    <Link to="/profile?tab=achievements" className="text-orange-400 text-sm hover:underline flex items-center gap-1">
                        View Badges <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="glass-card p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                    <Link to="/donation-history" className="text-sm text-neutral-400 hover:text-white transition-colors">View All</Link>
                </div>

                {recentActivity.length === 0 ? (
                    <div className="text-neutral-500 text-center py-4">
                        No recent activity. Start by making a donation!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recentActivity.map((donation) => (
                            <div key={donation._id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl overflow-hidden">
                                        {donation.images && donation.images.length > 0 ? (
                                            <img src={`${API_BASE}/${donation.images[0].replace(/\\/g, '/')}`} alt="Donation" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="material-symbols-outlined">volunteer_activism</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium capitalize">{donation.title}</h4>
                                        <p className="text-neutral-500 text-sm">
                                            {new Date(donation.createdAt).toLocaleDateString()}
                                            {donation.pickupLocation ? ` • ${donation.pickupLocation}` : ''}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full border uppercase ${getStatusColor(donation.status)}`}>
                                    {donation.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonorDashboard;
