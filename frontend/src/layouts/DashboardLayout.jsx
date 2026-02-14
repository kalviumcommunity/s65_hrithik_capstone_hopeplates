import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../components/ui";

const DashboardLayout = () => {
    const location = useLocation();
    const navItems = [
        { label: 'Dashboard', path: '/donations', icon: 'dashboard' },
        { label: 'History', path: '/donation-history', icon: 'history' },
        { label: 'Messages', path: '/messages', icon: 'chat' },
        { label: 'Profile', path: '/profile', icon: 'person' },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex font-sans text-[#181311]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-20">
                <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-50">
                    <div className="w-8 h-8 bg-[#FF7043] rounded-lg text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.28 3.6-2.34 3.6-5.4 0-3.32-2.88-6-6.6-6-3.71 0-6.6 2.68-6.6 6 0 1.28.78 2.45 2 3.3" /><path d="M12 5 9 3 6 5 3 3v13" /><path d="M12 5v14" /></svg>
                    </div>
                    <span className="text-lg font-bold font-display tracking-tight">HopePlates</span>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-orange-50 text-[#FF7043]' : 'text-[#546E7A] hover:bg-gray-50 hover:text-gray-900'}`}
                                >
                                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#FF7043]' : 'text-gray-400 group-hover:text-gray-600'}`}>{item.icon}</span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="mt-8 px-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Quick Actions</p>
                        <Link to="/make-donation">
                            <Button className="w-full justify-start gap-3 bg-[#FF7043] text-white hover:bg-[#F4511E] shadow-lg shadow-orange-500/20">
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                New Donation
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gray-200 border border-white shadow-sm flex items-center justify-center overflow-hidden">
                            {/* Placeholder Avatar */}
                            <span className="material-symbols-outlined text-gray-400">person</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#181311] truncate">Hrithik S.</p>
                            <p className="text-xs text-gray-500 truncate">Donor Account</p>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">logout</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
