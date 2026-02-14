import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");

            if (!token || !userStr) {
                navigate("/login");
                return;
            }

            try {
                const initialUser = JSON.parse(userStr);
                setUser(initialUser);

                // API Base URL
                const API_BASE = window.location.hostname === "localhost"
                    ? "http://localhost:5000"
                    : "https://s65-hrithik-capstone-hopeplates.onrender.com";

                // Fetch fresh profile data to ensure photos etc are current
                const res = await fetch(`${API_BASE}/api/users/${initialUser.id || initialUser._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.ok) {
                    const freshUser = await res.json();
                    setUser(freshUser);
                    localStorage.setItem("user", JSON.stringify(freshUser));

                    if (freshUser.verificationStatus === "pending") {
                        navigate("/pending-approval");
                    }
                } else if (res.status === 401) {
                    navigate("/login");
                }
            } catch (e) {
                console.error("Auth error:", e);
                navigate("/login");
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const baseNavItems = [
        { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        // Only show "Donations" (Active Listings) to non-donors (e.g., NGOs, Admins)
        ...(user?.role !== 'donor' ? [{ label: 'Donations', path: '/donations', icon: 'volunteer_activism' }] : []),
        { label: 'History', path: '/donation-history', icon: 'history' },
        { label: 'Messages', path: '/messages', icon: 'chat' },
        { label: 'Profile', path: '/profile', icon: 'person' },
    ];

    const adminNavItems = user?.role === "admin" ? [
        { label: 'Verify Users', path: '/pending-verifications', icon: 'verified_user' }
    ] : [];

    const navItems = [...baseNavItems, ...adminNavItems];

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Clear user data
        window.location.href = '/login';
    };

    if (!user) return null; // Or loading spinner while checking auth

    return (
        <div className="min-h-screen bg-black text-white flex font-sans overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none"></div>

            {/* Glass Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 glass-dark border-r border-white/5 flex flex-col z-20">
                <Link to="/" className="h-20 flex items-center gap-3 px-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-black">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">HopePlates</span>
                </Link>

                <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
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

                    {user.role !== "admin" && (
                        <div className="mt-8 px-4">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Quick Actions</p>
                            <Link to="/make-donation">
                                <Button className="w-full justify-start gap-3 bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 border-0">
                                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                    New Donation
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-white/5">
                    <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center overflow-hidden">
                            {/* Initials Avatar */}
                            {user.profilePhoto ? (
                                <img src={user.profilePhoto.startsWith("http") ? user.profilePhoto : `${window.location.hostname === "localhost" ? "http://localhost:5000" : "https://s65-hrithik-capstone-hopeplates.onrender.com"}/${user.profilePhoto.replace(/\\/g, '/')}`} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-neutral-400 text-xs font-bold">{user.name?.substring(0, 2).toUpperCase()}</div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{user.name}</p>
                            <p className="text-xs text-neutral-500 truncate capitalize">{user.role}</p>
                        </div>
                        <button onClick={handleLogout} className="p-2 hover:text-red-400 transition-colors rounded-full hover:bg-white/10" title="Logout">
                            <span className="material-symbols-outlined text-neutral-500 hover:text-red-400 transition-colors">logout</span>
                        </button>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 min-h-screen relative z-10 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-20 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent capitalize">
                            {location.pathname.substring(1).replace('-', ' ') || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search or notifications could go here */}

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold border-white">{user.name}</p>
                                <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
                            </div>
                            <Link to="/profile" className="w-10 h-10 rounded-full bg-white/10 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20">
                                {user.profilePhoto ? (
                                    <img
                                        src={user.profilePhoto.startsWith("http") ? user.profilePhoto : `${window.location.hostname === "localhost" ? "http://localhost:5000" : "https://s65-hrithik-capstone-hopeplates.onrender.com"}/${user.profilePhoto.replace(/\\/g, '/')}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-blue-400 font-bold bg-blue-500/10">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
