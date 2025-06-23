import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [role, setRole] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
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
        setMenuOpen(false);
    };

    const handleMenuToggle = () => setMenuOpen((prev) => !prev);

    return (
        <nav>
            <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link to="/" style={{ fontWeight: "bold", fontSize: 24, color: "#007bff", textDecoration: "none" }}>
                    Hope Plates
                </Link>
                <button
                    onClick={handleMenuToggle}
                    style={{
                        background: "none",
                        border: "none",
                        fontSize: 28,
                        cursor: "pointer",
                        marginLeft: "auto",
                        color: "#007bff",
                        boxShadow: "none",  
                        padding: 0,        
                        width: 40,           
                        height: 40,             
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    aria-label="Menu"
                >
                    <span style={{lineHeight: 1}}>&#9776;</span>
                </button>
                {menuOpen && (
                    <div
                        style={{
                            position: "absolute",
                            top: 60,
                            right: 20,
                            background: "#fff",
                            border: "1px solid #ccc",
                            borderRadius: 8,
                            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                            zIndex: 1000,
                            minWidth: 180,
                            padding: 12
                        }}
                        onMouseLeave={() => setMenuOpen(false)} 
                    >
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/donations" onClick={() => setMenuOpen(false)}>Donations</Link></li>
                            <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                            <li><Link to="/messages" onClick={() => setMenuOpen(false)}>Messages</Link></li>
                            {role === "admin" && (
                                <li><Link to="/pending-verifications" onClick={() => setMenuOpen(false)}>Pending Verifications</Link></li>
                            )}
                            {role !== "admin" && role !== "ngo" && (
                                <li><Link to="/make-donation" onClick={() => setMenuOpen(false)}>Make Donation</Link></li>
                            )}
                            <li>
                                {role ? (
                                    <Link to="#" onClick={handleLogout}>Logout</Link>
                                ) : (
                                    <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;