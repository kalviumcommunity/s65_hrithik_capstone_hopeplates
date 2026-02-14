import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../components/ui";

const DashboardLayout = () => {
    const location = useLocation();
    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { label: 'Donations', path: '/donations', icon: 'volunteer_activism' },
        { label: 'History', path: '/donation-history', icon: 'history' },
        { label: 'Messages', path: '/messages', icon: 'chat' },
        { label: 'Profile', path: '/profile', icon: 'person' },
    ];

    return (
    return (
        <div className="min-h-screen bg-black text-white flex font-sans overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none"></div>

            {/* Glass Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 glass-dark border-r border-white/5 flex flex-col z-20">
                <div className="h-20 flex items-center gap-3 px-6 border-b border-white/5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-black">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">HopePlates</span>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                                >
                                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-black' : 'text-neutral-500 group-hover:text-white'}`}>{item.icon}</span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="mt-8 px-4">
                        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Quick Actions</p>
                        <Link to="/make-donation">
                            <Button className="w-full justify-start gap-3 bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 border-0">
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                New Donation
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center overflow-hidden">
                            {/* Placeholder Avatar */}
                            <span className="material-symbols-outlined text-neutral-400">person</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">My Account</p>
                            <p className="text-xs text-neutral-500 truncate">View Profile</p>
                        </div>
                        <span className="material-symbols-outlined text-neutral-500 hover:text-white transition-colors">logout</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative z-10 scrollbar-hide">
                <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
