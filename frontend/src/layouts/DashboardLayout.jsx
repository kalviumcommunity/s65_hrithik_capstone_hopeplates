import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notifLoading, setNotifLoading] = useState(false);

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

                // Fetch fresh profile data
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
        ...(['ngo', 'admin'].includes(user?.role) ? [{ label: 'Donations', path: '/donations', icon: 'volunteer_activism' }] : []),
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
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const toggleNotifications = async () => {
        const newState = !isNotifOpen;
        setIsNotifOpen(newState);

        if (newState) {
            setNotifLoading(true);
            try {
                const API_BASE = window.location.hostname === "localhost"
                    ? "http://localhost:5000"
                    : "https://s65-hrithik-capstone-hopeplates.onrender.com";

                // Fetch recent pending donations to simulate notifications
                // Ideally this would be a dedicated notifications endpoint
                const res = await fetch(`${API_BASE}/api/donations`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    let recent = [];

                    if (user?.role === 'ngo') {
                        // NGOs see new opportunities
                        recent = data
                            .filter(d => d.status === 'pending')
                            .slice(0, 5);
                    } else {
                        // Donors see requests/claims on their items
                        // We check if the donation belongs to the user AND has been claimed/processed
                        recent = data
                            .filter(d => {
                                const donorId = d.donor?._id || d.donor;
                                const isMine = donorId === user._id || donorId === user.id;
                                // "Request Notifications" implies someone is requesting/claiming their item
                                return isMine && (d.status === 'claimed' || d.status === 'completed');
                            })
                            // Sort by most recently updated/created
                            .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
                            .slice(0, 5);
                    }
                    setNotifications(recent);
                }
            } catch (err) {
                console.error("Failed to fetch notifications", err);
            } finally {
                setNotifLoading(false);
            }
        }
    };

    if (!user) return null;

    // Helper for formatted profile image
    const getProfileImg = () => {
        if (!user.profilePhoto) return null;
        if (user.profilePhoto.startsWith("http")) return user.profilePhoto;
        const API_BASE = window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://s65-hrithik-capstone-hopeplates.onrender.com";
        return `${API_BASE}/${user.profilePhoto.replace(/\\/g, '/')}`;
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-transparent font-sans">

            {/* Sidebar - Integrated Glass Panel */}
            <aside className="w-20 lg:w-72 h-full glass-dark flex flex-col border-r border-white/5 z-20 transition-all duration-300">
                {/* Logo Area */}
                <Link to="/" className="h-24 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-white text-[20px] animate-heartbeat">favorite</span>
                    </div>
                    <span className="hidden lg:block ml-3 text-xl font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
                        HopePlates
                    </span>
                </Link>

                {/* Navigation Items */}
                <nav className="flex-1 py-8 px-2 lg:px-4 space-y-2 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative flex items-center justify-center lg:justify-start gap-4 px-3 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                                    : 'text-neutral-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[24px] transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`}>{item.icon}</span>
                                <span className="hidden lg:block text-sm font-medium tracking-wide">{item.label}</span>

                                {/* Beacon removed as per user request */}
                            </Link>
                        )
                    })}
                </nav>

                {/* User Profile Widget at Bottom */}
                <div className="p-4 border-t border-white/5">
                    <div className="glass-light p-3 rounded-2xl flex items-center justify-center lg:justify-between gap-3 group hover:bg-white/10 transition-all cursor-pointer">
                        <Link to="/profile" className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden shrink-0">
                                {getProfileImg() ? (
                                    <img src={getProfileImg()} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
                                        <span className="text-sm font-bold text-white">{user.name?.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                            <div className="hidden lg:block min-w-0 text-left">
                                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                <p className="text-xs text-neutral-400 truncate capitalize">{user.role}</p>
                            </div>
                        </Link>
                        <button onClick={handleLogout} className="hidden lg:block p-2 text-neutral-400 hover:text-red-400 hover:bg-white/5 rounded-full transition-all">
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative z-10">
                {/* Header - Glass Strip */}
                {/* Header - Glass Strip */}
                <header className="h-20 shrink-0 px-8 flex items-center justify-between bg-white/5 backdrop-blur-2xl border-b border-white/5 z-30 shadow-lg shadow-black/5 transition-all">
                    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
                        {/* Dynamic Title with Icon */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 shadow-inner group">
                            <span className={`material-symbols-outlined text-2xl group-hover:scale-110 transition-transform ${{
                                '/dashboard': 'text-blue-400',
                                '/donations': 'text-green-400',
                                '/donation-history': 'text-purple-400',
                                '/messages': 'text-pink-400',
                                '/profile': 'text-yellow-400',
                                '/make-donation': 'text-orange-400'
                            }[location.pathname] || 'text-white'
                                }`}>
                                {{
                                    '/dashboard': 'dashboard',
                                    '/donations': 'volunteer_activism',
                                    '/donation-history': 'history',
                                    '/messages': 'chat',
                                    '/profile': 'person',
                                    '/make-donation': 'add_circle',
                                    '/pending-approval': 'hourglass_empty',
                                    '/pending-verifications': 'verified_user',
                                    '/settings': 'settings'
                                }[location.pathname] || 'stars'}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent capitalize tracking-tight">
                            {{
                                '/dashboard': 'Dashboard',
                                '/donations': 'Community Donations',
                                '/donation-history': 'My Impact',
                                '/messages': 'Messages',
                                '/profile': 'My Profile',
                                '/make-donation': 'Share Hope',
                                '/pending-approval': 'Pending Approval',
                                '/settings': 'Settings'
                            }[location.pathname] || location.pathname.substring(1).replace('-', ' ')}
                        </h2>
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center gap-4">
                        <Link to="/make-donation" className="hidden md:flex btn-primary items-center gap-2 text-sm px-5 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            <span>Donate</span>
                        </Link>
                        <div className="relative z-50">
                            <button
                                onClick={toggleNotifications}
                                className={`w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center relative hover:scale-105 active:scale-95 group ${isNotifOpen ? 'bg-blue-600/20 text-blue-400' : ''}`}
                            >
                                <span className="material-symbols-outlined text-[22px] group-hover:shake-little">notifications</span>
                                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75"></span>
                                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black shadow-lg shadow-red-500/50"></span>
                            </button>

                            {/* Notification Popup */}
                            {isNotifOpen && (
                                <div className="absolute right-0 mt-3 w-80 md:w-96 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                        <h3 className="font-bold text-white">
                                            {user.role === 'ngo' ? 'New Donations' : 'Updates & Requests'}
                                        </h3>
                                        <span className="text-xs text-neutral-400">Live</span>
                                    </div>

                                    <div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                                        {notifLoading ? (
                                            <div className="p-8 text-center text-neutral-500">
                                                <span className="material-symbols-outlined animate-spin text-3xl mb-2">sync</span>
                                                <p className="text-sm">Checking for updates...</p>
                                            </div>
                                        ) : notifications.length > 0 ? (
                                            <div className="divide-y divide-white/5">
                                                {notifications.map((notif) => (
                                                    <Link
                                                        to={user.role === 'ngo' ? `/donations` : `/donation-history`}
                                                        key={notif._id}
                                                        className="block p-4 hover:bg-white/5 transition-colors group"
                                                        onClick={() => setIsNotifOpen(false)}
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden shrink-0">
                                                                {notif.images && notif.images.length > 0 ? (
                                                                    <img src={notif.images[0].startsWith('http') ? notif.images[0] : `${window.location.hostname === "localhost" ? "http://localhost:5000" : "https://s65-hrithik-capstone-hopeplates.onrender.com"}/${notif.images[0].replace(/\\/g, '/')}`} className="w-full h-full object-cover" alt="" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                                                        <span className="material-symbols-outlined text-lg opacity-50">inventory_2</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                                                    {user.role === 'ngo' ? (
                                                                        <>
                                                                            {notif.donor?.name || 'Anonymous'} listed <span className="font-bold text-white">"{notif.title}"</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            Status update on <span className="font-bold text-white">"{notif.title}"</span>: <span className="uppercase text-xs font-bold bg-white/10 px-1.5 py-0.5 rounded">{notif.status}</span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                                <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                                                                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                                                                    {new Date(notif.createdAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center text-neutral-500">
                                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">notifications_off</span>
                                                <p className="text-sm">
                                                    {user.role === 'ngo' ? 'No new donations right now.' : 'No recent updates or requests.'}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-3 border-t border-white/10 bg-white/5 text-center">
                                        <Link
                                            to={user.role === 'ngo' ? "/donations" : "/donation-history"}
                                            className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                            onClick={() => setIsNotifOpen(false)}
                                        >
                                            View all activity
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
