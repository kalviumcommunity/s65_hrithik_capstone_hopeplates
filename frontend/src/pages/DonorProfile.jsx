import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, MapPin, Mail, MessageCircle, ArrowLeft, Trophy, Star, Award, Heart, Gift, Sparkles, Calendar } from "lucide-react";

// Badge milestones matching Profile.jsx for consistency
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

const DonorProfile = () => {
    const { userId } = useParams(); // Changed id to userId to match App.jsx route /user/:userId
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [donationCount, setDonationCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const navigate = useNavigate();

    // Dynamic API URL handling
    const API_BASE = window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://s65-hrithik-capstone-hopeplates.onrender.com";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const user = JSON.parse(atob(token.split(".")[1]));
                setCurrentUserId(user.id);
            } catch (e) {
                console.error("Invalid token");
            }
        }

        const fetchDonor = async () => {
            try {
                // Fetch donor details
                const res = await fetch(`${API_BASE}/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!res.ok) throw new Error("Donor not found");

                const data = await res.json();
                setDonor(data);

                // Fetch donation count
                const countRes = await fetch(`${API_BASE}/api/donations/count/${userId}`);
                if (countRes.ok) {
                    const countData = await countRes.json();
                    setDonationCount(countData.count || 0);
                }
            } catch (err) {
                console.error("Error fetching donor:", err);
                setDonor(null);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchDonor();
    }, [userId, API_BASE]);

    const handleChat = () => {
        if (!donor) return;
        navigate('/messages', { state: { chatWith: donor } });
    };

    const currentBadge = badgeMilestones.find(b => donationCount >= b.min) || badgeMilestones[badgeMilestones.length - 1];

    // Helper to safely format image URL
    const getImageUrl = (path) => {
        if (!path) return defaultAvatar;
        // Fix Windows paths by replacing backslashes with forward slashes
        const cleanPath = path.replace(/\\/g, '/');
        return `${API_BASE}/${cleanPath}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!donor) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-neutral-400">
                <p className="mb-4">User not found.</p>
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white rounded-full">Go Back</button>
            </div>
        );
    }

    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(donor.name)}&background=random&color=fff&size=200`;

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-20 md:ml-64">
            <div className="max-w-4xl mx-auto pt-10">
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} /> Back
                </button>

                {/* Profile Header Card */}
                <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden bg-zinc-900/40 border border-white/5">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <currentBadge.icon size={150} />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-black shadow-2xl">
                                <img
                                    src={getImageUrl(donor.profilePhoto)}
                                    alt={donor.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = defaultAvatar; }}
                                />
                            </div>
                            <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${currentBadge.color} text-white p-2 rounded-full shadow-lg border-4 border-black`}>
                                <currentBadge.icon size={20} />
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-2">
                                {donor.name}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-neutral-400 text-sm mb-4">
                                <span className="flex items-center gap-1"><MapPin size={16} /> {donor.location || "Unknown Location"}</span>
                                <span className="flex items-center gap-1"><Calendar size={16} /> Joined {new Date(donor.createdAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-blue-400 font-bold uppercase text-xs">{donor.role}</span>
                            </div>

                            {/* Action Buttons */}
                            {currentUserId && currentUserId !== donor._id && (
                                <button
                                    onClick={handleChat}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 mx-auto md:mx-0"
                                >
                                    <MessageCircle size={20} />
                                    Send Message
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2 glass-card rounded-3xl p-8 border border-white/5 bg-zinc-900/40">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <User size={20} className="text-blue-400" />
                            About
                        </h3>
                        <p className="text-neutral-400 leading-relaxed">
                            {donor.about || "This user hasn't written a bio yet."}
                        </p>
                    </div>

                    <div className="glass-card rounded-3xl p-8 border border-white/5 bg-zinc-900/40">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Award size={20} className="text-yellow-400" />
                            Impact
                        </h3>
                        <div className="text-center">
                            <p className="text-5xl font-bold text-white mb-2">{donationCount}</p>
                            <p className="text-neutral-400 uppercase text-xs tracking-wider">Donations Made</p>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                {donor.images && donor.images.length > 0 && (
                    <div className="glass-card rounded-3xl p-8 border border-white/5 bg-zinc-900/40">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Sparkles size={20} className="text-purple-400" />
                            Gallery
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {donor.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                                    onClick={() => {
                                        setCurrentImgIdx(idx);
                                        setModalOpen(true);
                                    }}
                                >
                                    <img
                                        src={getImageUrl(img)}
                                        alt={`Gallery ${idx}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Sparkles className="text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {modalOpen && donor.images && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setModalOpen(false)}
                >
                    <button className="absolute top-4 right-4 text-white hover:text-neutral-300">
                        <span className="material-symbols-outlined text-4xl">close</span>
                    </button>
                    <img
                        src={getImageUrl(donor.images[currentImgIdx])}
                        alt="Zoomed"
                        className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default DonorProfile;