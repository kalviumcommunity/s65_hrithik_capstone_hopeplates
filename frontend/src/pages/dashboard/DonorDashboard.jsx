import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WeatherWidget from "../../components/dashboard/WeatherWidget";
import NewsFeed from "../../components/dashboard/NewsFeed";
import DailyQuote from "../../components/dashboard/DailyQuote";
import { Sparkles, TrendingUp, HandHeart, Trophy } from "lucide-react";

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
                    history = Array.isArray(data) ? data.filter(d => d.status !== 'rejected').slice(0, 3) : [];
                }

                setStats({
                    totalDonations: count,
                    impact: count * 5, // Mock: 5 meals per donation
                    points: count * 50 // Mock: 50 points per donation
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

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

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
        <div className="space-y-8 animate-in fade-in duration-700 pb-20">
            {/* Dynamic Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-2">
                        {getGreeting()}, {user?.name?.split(' ')[0] || 'Hero'}!
                    </h1>
                    <div className="flex items-center gap-2 text-neutral-400 text-lg">
                        <Sparkles size={18} className="text-yellow-400" />
                        <span>Ready to make an impact today?</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link to="/profile" className="btn-glass flex items-center gap-2">
                        <span className="material-symbols-outlined">person</span>
                        Profile
                    </Link>
                    <Link to="/make-donation" className="btn-primary flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:scale-105 transition-all">
                        <span className="material-symbols-outlined">add_circle</span>
                        New Donation
                    </Link>
                </div>
            </div>

            {/* Quick Stats & Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Weather Widget (Span 3) */}
                <div className="md:col-span-3 h-full">
                    <WeatherWidget />
                </div>

                {/* Stats Cards (Span 9) */}
                <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                        <div className="flex justify-between items-start z-10">
                            <h3 className="text-neutral-400 font-medium text-sm uppercase tracking-wider">Total Donations</h3>
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <HandHeart size={20} />
                            </div>
                        </div>
                        <div className="z-10 mt-auto">
                            <span className="text-4xl font-bold text-white">{stats.totalDonations}</span>
                            <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                <TrendingUp size={12} /> +12% this month
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
                        <div className="flex justify-between items-start z-10">
                            <h3 className="text-neutral-400 font-medium text-sm uppercase tracking-wider">Impact Score</h3>
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                        <div className="z-10 mt-auto">
                            <span className="text-4xl font-bold text-white">{stats.impact}</span>
                            <p className="text-xs text-neutral-500 mt-1">Meals provided to families</p>
                        </div>
                    </div>

                    <div className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all duration-500"></div>
                        <div className="flex justify-between items-start z-10">
                            <h3 className="text-neutral-400 font-medium text-sm uppercase tracking-wider">Karma Points</h3>
                            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                                <Trophy size={20} />
                            </div>
                        </div>
                        <div className="z-10 mt-auto">
                            <span className="text-4xl font-bold text-white">{stats.points}</span>
                            <Link to="/profile?tab=achievements" className="text-yellow-500 text-xs hover:underline flex items-center gap-1 mt-1 font-bold">
                                View Rewards <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quote of the Day */}
            <DailyQuote />

            {/* Content Grid: Activity & News */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Recent Activity (Span 8) */}
                <div className="md:col-span-8 glass-card p-8 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-500">history</span>
                            Recent Activity
                        </h3>
                        <Link to="/donation-history" className="text-sm text-neutral-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full hover:bg-white/10">
                            View All History
                        </Link>
                    </div>

                    {recentActivity.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-10 text-neutral-500">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                            </div>
                            <p className="text-lg mb-4">No recent activity yet.</p>
                            <Link to="/make-donation" className="text-blue-400 hover:underline">Make your first donation</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentActivity.map((donation) => (
                                <div key={donation._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 transition-all group cursor-pointer hover:scale-[1.01] hover:shadow-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
                                            {donation.images && donation.images.length > 0 ? (
                                                <img src={`${API_BASE}/${donation.images[0].replace(/\\/g, '/')}`} alt="Donation" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-700 to-neutral-900 text-neutral-500">
                                                    <span className="material-symbols-outlined">image_not_supported</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white capitalize mb-1">{donation.title}</h4>
                                            <div className="flex items-center gap-3 text-sm text-neutral-400">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">calendar_today</span> {new Date(donation.createdAt).toLocaleDateString()}</span>
                                                {donation.pickupLocation && (
                                                    <span className="flex items-center gap-1 truncate max-w-[150px]"><span className="material-symbols-outlined text-xs">location_on</span> {donation.pickupLocation}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 flex items-center gap-4">
                                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full border uppercase tracking-wider ${getStatusColor(donation.status)}`}>
                                            {donation.status}
                                        </span>
                                        <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* News Feed (Span 4) */}
                <div className="md:col-span-4 h-full">
                    <NewsFeed />
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;
