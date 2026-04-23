import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://s65-hrithik-capstone-hopeplates.onrender.com";

const PendingVerifications = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingVerifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(`${API_BASE}/api/admin/pending-verifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch pending verifications");
        }
        const data = await response.json();
        setPendingUsers(data.pendingUsers || []);
      } catch (err) {
        console.error("Error fetching pending verifications:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingVerifications();
  }, [navigate]);

  const handleVerify = async (id, e) => {
    if (e) e.stopPropagation();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE}/api/admin/verify/user/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      alert("User verified successfully!");
      setPendingUsers((prev) => prev.filter((user) => user._id !== id));
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to reject and delete this user?")) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE}/api/admin/reject/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      alert("User rejected and deleted successfully!");
      setPendingUsers((prev) => prev.filter((user) => user._id !== id));
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch (e) {
      console.error(e);
      return dateStr;
    }
  };

  const imageUrl = (path) => {
    if (!path) return null;
    return `${API_BASE}/${path.replace(/\\/g, "/")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-6 text-center text-red-500">
        <p>Error: {error}</p>
        <button onClick={() => navigate("/dashboard")} className="mt-4 btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 bg-transparent text-white animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Pending Verifications</h1>
            <p className="text-neutral-400 mt-1">Review and verify pending user registrations</p>
          </div>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="glass-card p-12 text-center border-dashed border-2 border-white/10">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-green-500">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're all caught up!</h3>
            <p className="text-neutral-400">No pending verifications at this time.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1">
            {pendingUsers.map((user) => (
              <div 
                key={user._id} 
                onClick={() => setSelectedUser(user)}
                className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center md:items-start cursor-pointer hover:bg-white/10 transition-colors border border-white/5"
              >
                {/* Profile Avatar */}
                <div className="w-24 h-24 shrink-0 rounded-full bg-black/50 overflow-hidden border-2 border-white/10 shadow-lg">
                  {user.profilePhoto ? (
                    <img src={imageUrl(user.profilePhoto)} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl w-full h-full flex items-center justify-center text-neutral-500">person</span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400">{user.name}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400 mt-2 justify-center md:justify-start">
                    <div><span className="font-semibold text-neutral-500 uppercase text-xs mr-1">Role:</span> <span className="uppercase text-blue-400 font-bold">{user.role}</span></div>
                    <div><span className="font-semibold text-neutral-500 uppercase text-xs mr-1">Email:</span> {user.email}</div>
                    <div><span className="font-semibold text-neutral-500 uppercase text-xs mr-1">Location:</span> {user.location || "—"}</div>
                    <div><span className="font-semibold text-neutral-500 uppercase text-xs mr-1">Registered:</span> {formatDate(user.createdAt)}</div>
                  </div>
                  {user.images?.length > 0 && (
                    <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-sm font-semibold text-purple-400 bg-purple-500/10 inline-flex px-3 py-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-sm">photo_library</span>
                        {user.images.length} gallery items available
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 md:flex-col shrink-0 mt-4 md:mt-0">
                  <button onClick={(e) => handleVerify(user._id, e)} className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors w-full">
                    Verify
                  </button>
                  <button onClick={(e) => handleReject(user._id, e)} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors w-full">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal View */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="glass-dark border border-white/10 rounded-[32px] w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 sticky top-0 z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-lg bg-black">
                        {selectedUser.profilePhoto ? (
                            <a href={imageUrl(selectedUser.profilePhoto)} target="_blank" rel="noreferrer" title="Click to view full size">
                                <img src={imageUrl(selectedUser.profilePhoto)} className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
                            </a>
                        ) : (
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center"><span className="material-symbols-outlined text-neutral-500">person</span></div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-0.5">{selectedUser.name}</h2>
                        <span className="uppercase text-blue-400 font-bold text-[10px] tracking-widest bg-blue-500/10 px-2 py-1 rounded-md">{selectedUser.role}</span>
                    </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto w-full custom-scrollbar flex-1 space-y-8">
                
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col justify-center">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1.5 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">mail</span> Email Contact</p>
                        <p className="text-white font-medium break-all">{selectedUser.email}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col justify-center">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1.5 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">location_on</span> Location</p>
                        <p className="text-white font-medium">{selectedUser.location || "N/A"}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col justify-center">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1.5 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">event</span> Registered</p>
                        <p className="text-white font-medium">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                </div>

                {/* Gallery Images */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                        <span className="material-symbols-outlined text-purple-400">photo_library</span> 
                        Verification Gallery ({selectedUser.images?.length || 0})
                    </h3>
                    
                    {selectedUser.images && selectedUser.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {selectedUser.images.map((img, idx) => (
                                <a key={idx} href={imageUrl(img)} target="_blank" rel="noreferrer" className="aspect-square bg-black/50 rounded-2xl overflow-hidden border border-white/10 hover:border-white/40 shadow-xl transition-all group relative block">
                                    <img src={imageUrl(img)} alt={`gallery-${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-white text-3xl mb-2">zoom_in</span>
                                        <span className="text-white text-xs font-bold uppercase tracking-widest">View Full</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-neutral-500 flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border-dashed border-2 border-white/10">
                            <span className="material-symbols-outlined text-4xl mb-3 opacity-50">image_not_supported</span>
                            <p>This user did not upload any additional gallery images.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end gap-4 sticky bottom-0 shrink-0">
                <button onClick={() => setSelectedUser(null)} className="px-6 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white transition-colors">
                    Cancel
                </button>
                <button onClick={() => handleReject(selectedUser._id)} className="px-6 py-3 rounded-xl font-bold bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition-colors">
                    Reject User
                </button>
                <button onClick={() => handleVerify(selectedUser._id)} className="px-8 py-3 rounded-xl font-bold btn-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Approve & Verify
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingVerifications;
