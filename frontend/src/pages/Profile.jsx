import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    User, MapPin, Calendar, Award, Heart,
    TrendingUp, Camera, Edit3, Trophy, Gift, Star, Sparkles
} from "lucide-react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [donationCount, setDonationCount] = useState(0);
    const [recentDonations, setRecentDonations] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();
    const locationHook = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(locationHook.search);
        const tabParam = params.get('tab');
        if (tabParam && ['overview', 'activity', 'achievements', 'settings'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [locationHook.search]);

    // Dynamic API URL handling
    const API_BASE = window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://s65-hrithik-capstone-hopeplates.onrender.com";

    // Badge milestones
    const badgeMilestones = [
        { min: 1500, name: "Legendary Hero", color: "from-yellow-400 to-orange-500", icon: Trophy },
        { min: 1000, name: "Diamond Donor", color: "from-blue-400 to-cyan-500", icon: Star },
        { min: 500, name: "Gold Giver", color: "from-yellow-500 to-yellow-600", icon: Award },
        { min: 200, name: "Silver Supporter", color: "from-gray-300 to-gray-500", icon: Heart },
        { min: 100, name: "Bronze Benefactor", color: "from-orange-600 to-orange-700", icon: Gift },
        { min: 50, name: "Rising Star", color: "from-purple-400 to-pink-500", icon: Sparkles },
        { min: 10, name: "Hope Maker", color: "from-green-400 to-emerald-500", icon: Heart },
        { min: 1, name: "New Hope", color: "from-blue-400 to-indigo-500", icon: Star }
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                let userId;
                try {
                    const userData = JSON.parse(atob(token.split(".")[1]));
                    userId = userData.id;
                } catch (e) {
                    console.error("Invalid token:", e);
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                // Fetch user profile
                const userRes = await fetch(`${API_BASE}/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!userRes.ok) throw new Error("Failed to fetch user profile");

                const userProfile = await userRes.json();
                setUser(userProfile);
                setFormData({
                    name: userProfile.name || '',
                    location: userProfile.location || '',
                    about: userProfile.about || ''
                });

                // Fetch donation count
                const countRes = await fetch(`${API_BASE}/api/donations/count/${userId}`);
                if (countRes.ok) {
                    const countData = await countRes.json();
                    setDonationCount(countData.count || 0);
                }

                // Fetch recent donations
                const donationsRes = await fetch(`${API_BASE}/api/donations/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (donationsRes.ok) {
                    const donationsData = await donationsRes.json();
                    setRecentDonations(Array.isArray(donationsData) ? donationsData.slice(0, 5) : []);
                }

            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate, API_BASE]);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/api/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const updated = await res.json();
                setUser(updated);
                localStorage.setItem("user", JSON.stringify(updated));
                setEditMode(false);
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingPhoto(true);
        const formData = new FormData();
        formData.append("profilePhoto", file);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/api/users/upload-profile-photo`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                setUser(prev => {
                    const updated = { ...prev, profilePhoto: data.profilePhoto };
                    localStorage.setItem("user", JSON.stringify(updated));
                    return updated;
                });
            }
        } catch (err) {
            console.error("Error uploading photo:", err);
        } finally {
            setUploadingPhoto(false);
        }
    };

    // Helper to safely format image URL
    const getImageUrl = (path) => {
        if (!path) return defaultAvatar;
        // Fix Windows paths by replacing backslashes with forward slashes
        const cleanPath = path.replace(/\\/g, '/');
        return `${API_BASE}/${cleanPath}`;
    };

    const currentBadge = badgeMilestones.find(b => donationCount >= b.min) || null;
    const nextBadge = [...badgeMilestones].reverse().find(b => donationCount < b.min);

    const currentMin = currentBadge ? currentBadge.min : 0;
    const nextMin = nextBadge ? nextBadge.min : 10;
    const progress = Math.min(100, Math.max(0, ((donationCount - currentMin) / (nextMin - currentMin)) * 100));

    const defaultAvatar = user ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=200` : "";

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-neutral-400">
                <p className="mb-4">Profile not found.</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 rounded-full text-white">Retry</button>
            </div>
        );
    }

    const stats = [
        { label: "Donations", value: donationCount, icon: Gift, color: "text-blue-400" },
        { label: "Impact", value: Math.floor(donationCount * 1.5), icon: TrendingUp, color: "text-green-400" },
        { label: "Days", value: user.createdAt ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0, icon: Calendar, color: "text-purple-400" },
        { label: "Rank", value: currentBadge?.name || "Member", icon: Trophy, color: "text-yellow-400" }
    ];

    return (
        <div className="min-h-screen bg-black text-white w-full overflow-x-hidden pb-20">
            {/* Hero Section */}
            <div className="relative h-64 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-purple-900 opacity-50"></div>
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

                {/* Profile Picture Container - Centered and overlapping */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex justify-center">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-full border-4 border-black bg-zinc-900 overflow-hidden shadow-2xl relative z-10">
                            <img
                                src={getImageUrl(user.profilePhoto)}
                                alt={user.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = defaultAvatar; }}
                            />

                            {/* Upload Overlay */}
                            <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20">
                                {uploadingPhoto ? (
                                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Camera className="text-white" size={32} />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                    disabled={uploadingPhoto}
                                />
                            </label>
                        </div>

                        {/* Current Badge Icon on Profile Pic */}
                        {currentBadge && (
                            <div className={`absolute bottom-2 right-2 z-30 p-2 rounded-full bg-gradient-to-r ${currentBadge.color} border-4 border-black shadow-lg`} title={currentBadge.name}>
                                <currentBadge.icon size={20} className="text-white" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto px-4 pt-24 max-w-5xl">
                {/* User Info - Centered */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
                    <p className="text-neutral-400 flex items-center justify-center gap-2">
                        <MapPin size={16} /> {user.location || "Earth"}
                    </p>
                    {user.role && (
                        <span className="inline-block mt-3 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                            {user.role}
                        </span>
                    )}
                </div>

                {/* Initial Tab Nav */}
                <div className="flex justify-center mb-10 border-b border-white/10 pb-4 overflow-x-auto">
                    {['overview', 'activity', 'achievements', 'settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-white' : 'text-neutral-500 hover:text-white'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                                        <stat.icon className={`${stat.color} mb-3`} size={28} />
                                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                                        <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* About Section */}
                            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <User size={20} className="text-blue-400" /> About Me
                                </h3>
                                <p className="text-neutral-300 leading-relaxed">
                                    {user.about || "No bio yet. Add one in settings!"}
                                </p>
                            </div>

                            {/* Gallery Preview */}
                            {user.images && user.images.length > 0 && (
                                <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Camera size={20} className="text-purple-400" /> Gallery
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {user.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative bg-black"
                                                onClick={() => {
                                                    setCurrentImgIdx(idx);
                                                    setModalOpen(true);
                                                }}
                                            >
                                                <img
                                                    src={getImageUrl(img)}
                                                    alt={`Gallery ${idx + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl">
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                                <Trophy size={20} className="text-yellow-400" /> Badges Collection
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {badgeMilestones.map((badge, idx) => {
                                    const unlocked = donationCount >= badge.min;
                                    return (
                                        <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border ${unlocked ? 'bg-white/5 border-white/10' : 'bg-black/20 border-white/5 opacity-50'}`}>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${unlocked ? `bg-gradient-to-br ${badge.color}` : 'bg-zinc-800'}`}>
                                                <badge.icon size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{badge.name}</p>
                                                <p className="text-xs text-neutral-500">{badge.min}+ Donations</p>
                                            </div>
                                            {unlocked && <Star size={16} className="ml-auto text-yellow-500 fill-yellow-500" />}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl max-w-2xl mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Edit3 size={20} className="text-blue-400" /> Edit Profile
                                </h3>
                                {!editMode ? (
                                    <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg">Edit Details</button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-lg">Cancel</button>
                                        <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">Save Changes</button>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Display Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        disabled={!editMode}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        disabled={!editMode}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Bio</label>
                                    <textarea
                                        value={formData.about}
                                        onChange={e => setFormData({ ...formData, about: e.target.value })}
                                        disabled={!editMode}
                                        rows={4}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors disabled:opacity-50 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal */}
            {modalOpen && user.images && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
                    <img
                        src={getImageUrl(user.images[currentImgIdx])}
                        alt="Zoomed"
                        className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button className="absolute top-4 right-4 text-white hover:text-neutral-400 transition-colors">
                        <span className="material-symbols-outlined text-4xl">close</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
