import React from 'react';
import { Link } from 'react-router-dom';

const DonorDashboard = ({ user }) => {
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
                        <h2 className="text-4xl font-bold text-white mt-2">12</h2>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">trending_up</span>
                        <span>+2 this month</span>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
                    <div>
                        <p className="text-neutral-400 font-medium text-sm uppercase tracking-wider">Impact Made</p>
                        <h2 className="text-4xl font-bold text-white mt-2">45</h2>
                        <p className="text-sm text-neutral-500">Meals provided</p>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-all"></div>
                    <div>
                        <p className="text-neutral-400 font-medium text-sm uppercase tracking-wider">Points Earned</p>
                        <h2 className="text-4xl font-bold text-white mt-2">1,250</h2>
                    </div>
                    <Link to="/rewards" className="text-orange-400 text-sm hover:underline flex items-center gap-1">
                        View Rewards <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="glass-card p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                    <Link to="/donation-history" className="text-sm text-neutral-400 hover:text-white transition-colors">View All</Link>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
                                    🥘
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Homemade Pasta Batch</h4>
                                    <p className="text-neutral-500 text-sm">Picked up by <span className="text-neutral-300">City Shelter</span> • 2 days ago</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                                COMPLETED
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;
