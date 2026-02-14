import React from 'react';

const ManagerDashboard = ({ user }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Event Manager Panel</h1>
                    <p className="text-neutral-400">Coordinate drives, manage volunteers, and track success.</p>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined">event</span>
                    Create New Event
                </button>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Event */}
                <div className="glass-card p-0 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                    <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" alt="Event" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                        <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full mb-3 inline-block">UPCOMING</span>
                        <h2 className="text-3xl font-bold text-white mb-2">Citywide Food Drive</h2>
                        <div className="flex items-center gap-6 text-sm text-neutral-300">
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">calendar_month</span> Sunday, 12th Aug</span>
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">group</span> 45 Volunteers</span>
                        </div>
                    </div>
                </div>

                {/* Event Stat */}
                <div className="space-y-6">
                    <div className="glass-card p-6 flex justify-between items-center">
                        <div>
                            <p className="text-neutral-400 text-sm uppercase">Total Events</p>
                            <h3 className="text-3xl font-bold text-white">24</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined">flag</span></div>
                    </div>
                    <div className="glass-card p-6 flex justify-between items-center">
                        <div>
                            <p className="text-neutral-400 text-sm uppercase">People Reached</p>
                            <h3 className="text-3xl font-bold text-white">5,200+</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined">groups</span></div>
                    </div>
                    <div className="glass-card p-6 flex justify-between items-center">
                        <div>
                            <p className="text-neutral-400 text-sm uppercase">Next Milestone</p>
                            <h3 className="text-3xl font-bold text-white">10k Reached</h3>
                        </div>
                        <div className="w-32 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-blue-500 w-[52%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Volunteer Management Table */}
            <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">Volunteer Roster</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-300">
                                {['JD', 'AS', 'WR', 'PL'][i % 4]}
                            </div>
                            <div>
                                <p className="text-white text-sm font-semibold">Volunteer Name {i}</p>
                                <p className="text-xs text-neutral-400">Assigned to: Logistics</p>
                            </div>
                            <span className="ml-auto w-2 h-2 rounded-full bg-green-500"></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
