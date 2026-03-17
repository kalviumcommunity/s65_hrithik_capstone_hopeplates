import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PendingApproval = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already verified, redirect to dashboard
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.isVerified) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "2.5rem",
          textAlign: "center",
          color: "#fff",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(251,191,36,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            fontSize: "2rem",
          }}
        >
          ⏳
        </div>

        <h1
          style={{
            fontSize: "1.6rem",
            fontWeight: "700",
            marginBottom: "0.75rem",
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Verification Pending
        </h1>

        <p style={{ color: "#9ca3af", lineHeight: "1.7", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
          Your account has been registered and is currently awaiting admin verification.
        </p>

        <p style={{ color: "#9ca3af", lineHeight: "1.7", marginBottom: "2rem", fontSize: "0.95rem" }}>
          You will be notified once your account has been approved. This usually takes{" "}
          <strong style={{ color: "#e5e7eb" }}>1–2 business days</strong>.
        </p>

        <div
          style={{
            background: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.2)",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "2rem",
            fontSize: "0.875rem",
            color: "#fbbf24",
          }}
        >
          📧 Please check your registered email for any updates from our team.
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.65rem 2rem",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#e5e7eb",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "500",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "rgba(255,255,255,0.14)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(255,255,255,0.08)";
          }}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;
