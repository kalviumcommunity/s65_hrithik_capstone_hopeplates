import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1]));
            setRole(user.role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setRole(null);
        navigate("/login");
    };

    return (
        <nav>
            <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link to="/" style={{ fontWeight: "bold", fontSize: 24, color: "#007bff", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <img src="/logo.png" alt="HopePlates" style={{ height: 40 }} onError={(e) => e.target.style.display = 'none'} />
                    HopePlates
                </Link>
                <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, gap: 8, alignItems: "center" }}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/donations">Donations</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/messages">Messages</Link></li>
                    {role === "admin" && (
                        <li><Link to="/pending-verifications">Pending Verifications</Link></li>
                    )}
                    {role !== "admin" && role !== "ngo" && (
                        <li><Link to="/make-donation">Make Donation</Link></li>
                    )}
                    <li>
                        {role ? (
                            <Link to="#" onClick={handleLogout}>Logout</Link>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;