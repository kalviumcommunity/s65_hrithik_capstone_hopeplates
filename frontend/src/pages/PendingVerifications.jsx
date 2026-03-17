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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingVerifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(`${API_BASE}/api/users/pending-verifications`, {
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

  const handleVerify = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE}/api/users/verify/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      alert("User verified successfully!");
      setPendingUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error verifying user:", err.message);
      alert(err.message);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject and delete this user?")) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE}/api/users/reject/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      alert("User rejected and deleted successfully!");
      setPendingUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error rejecting user:", err.message);
      alert(err.message);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch (e) {
      return dateStr;
    }
  };

  const imageUrl = (path) => {
    if (!path) return null;
    const p = path.replace(/\\/g, "/");
    return `${API_BASE}/${p}`;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{
          width: "40px", height: "40px",
          border: "3px solid rgba(99,102,241,0.3)",
          borderTop: "3px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#f87171" }}>
        <p>Error: {error}</p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", color: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>Pending Verifications</h1>
          <p style={{ color: "#9ca3af", marginTop: "0.25rem", fontSize: "0.9rem" }}>
            Review and verify or reject pending user registrations
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ padding: "0.5rem 1.25rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#e5e7eb", borderRadius: "8px", cursor: "pointer", fontSize: "0.875rem" }}
        >
          ← Back
        </button>
      </div>

      {pendingUsers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
          <p style={{ color: "#9ca3af", fontSize: "1rem" }}>No pending verifications at this time.</p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {pendingUsers.map((user) => (
            <li
              key={user._id}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>
                {/* User Info */}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ fontWeight: "700", fontSize: "1.15rem", marginBottom: "0.75rem" }}>{user.name}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.875rem", color: "#d1d5db" }}>
                    <div><span style={{ color: "#9ca3af" }}>Role: </span>{user.role}</div>
                    <div><span style={{ color: "#9ca3af" }}>Email: </span>{user.email}</div>
                    <div><span style={{ color: "#9ca3af" }}>Location: </span>{user.location || "—"}</div>
                    <div><span style={{ color: "#9ca3af" }}>Registered: </span>{user.createdAt ? formatDate(user.createdAt) : "—"}</div>
                  </div>
                </div>

                {/* Images */}
                <div style={{ display: "flex", gap: "1rem" }}>
                  {user.profilePhoto && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.35rem" }}>Profile</div>
                      <a href={imageUrl(user.profilePhoto)} target="_blank" rel="noreferrer">
                        <img
                          src={imageUrl(user.profilePhoto)}
                          alt={`${user.name} profile`}
                          style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.15)" }}
                        />
                      </a>
                    </div>
                  )}
                  {user.images && user.images.length > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.35rem" }}>About</div>
                      <a href={imageUrl(user.images[0])} target="_blank" rel="noreferrer">
                        <img
                          src={imageUrl(user.images[0])}
                          alt={`${user.name} about`}
                          style={{ width: "90px", height: "72px", borderRadius: "10px", objectFit: "cover", border: "2px solid rgba(255,255,255,0.15)" }}
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => handleVerify(user._id)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#15803d")}
                  onMouseOut={(e) => (e.target.style.background = "#16a34a")}
                >
                  ✓ Verify
                </button>
                <button
                  onClick={() => handleReject(user._id)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#b91c1c")}
                  onMouseOut={(e) => (e.target.style.background = "#dc2626")}
                >
                  ✗ Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingVerifications;
