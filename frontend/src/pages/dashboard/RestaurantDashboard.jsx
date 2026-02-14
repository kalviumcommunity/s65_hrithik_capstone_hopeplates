import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantDashboard = ({ user }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{user?.name || 'Restaurant'} Dashboard</h1>
                    <p className="text-neutral-400">Manage your surplus food and sustainability impact.</p>
                </div>
                <Link to="/make-donation" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg hover:shadow-white/20">
                    <span className="material-symbols-outlined">add_circle</span>
                    List Surplus Food
                </Link>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-8 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-green-500">compost</span>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white">450kg</h2>
                        <p className="text-neutral-400">Food Waste Diverted</p>
                    </div>
                </div>

                <div className="glass-card p-8 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-blue-500">co2</span>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white">1.2 Tons</h2>
                        <p className="text-neutral-400">CO2e Saved</p>
                    </div>
                </div>

                <div className="glass-card p-8 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-orange-500">diversity_1</span>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white">890</h2>
                        <p className="text-neutral-400">Meals Served</p>
                    </div>
                </div>
            </div>

            {/* Active Listings Table */}
            <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Active Listings</h3>
                    <button className="text-sm text-blue-400 hover:text-blue-300">View History</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-neutral-400">
                        <thead className="text-xs uppercase bg-white/5 text-neutral-300">
                            <tr>
                                <th className="px-6 py-4">Item</th>
                                <th className="px-6 py-4">Quantity</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Listed</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">Banquet Leftovers</td>
                                <td className="px-6 py-4">15kg</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-bold">Unclaimed</span></td>
                                <td className="px-6 py-4">2 hrs ago</td>
                                <td className="px-6 py-4"><button className="text-red-400 hover:text-red-300">Unlist</button></td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">Excess Bread</td>
                                <td className="px-6 py-4">5kg</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-bold">Claimed</span></td>
                                <td className="px-6 py-4">5 hrs ago</td>
                                <td className="px-6 py-4"><button className="text-neutral-400 hover:text-white">Details</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDashboard;
