import React from 'react';
import { Link } from 'react-router-dom';

const NGODashboard = ({ user }) => {
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
                    <h2 className="text-3xl font-bold text-white mt-1">8</h2>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-yellow-500">
                    <p className="text-neutral-400 font-medium text-xs uppercase">Pending Pickups</p>
                    <h2 className="text-3xl font-bold text-white mt-1">3</h2>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-green-500">
                    <p className="text-neutral-400 font-medium text-xs uppercase">Meals Distributed</p>
                    <h2 className="text-3xl font-bold text-white mt-1">1,402</h2>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-purple-500">
                    <p className="text-neutral-400 font-medium text-xs uppercase">Volunteers Online</p>
                    <h2 className="text-3xl font-bold text-white mt-1">12</h2>
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
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                                <div className="w-full md:w-32 h-24 bg-neutral-800 rounded-lg overflow-hidden relative">
                                    <img src={`https://source.unsplash.com/random/200x200?food&sig=${i}`} alt="Food" className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-lg text-white">Fresh Bakery Surplus</h4>
                                        <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">2km away</span>
                                    </div>
                                    <p className="text-neutral-400 text-sm mt-1">Whole wheat bread and croissants. Baked today morning.</p>
                                    <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Expires in 4h</span>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">scale</span> 5kg</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors">
                                        Claim
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
