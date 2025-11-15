import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [role, setRole] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        setIsMenuOpen(false);
        navigate("/login");
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav>
            <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link 
                    to="/" 
                    style={{ 
                        fontWeight: "bold", 
                        fontSize: 24, 
                        color: "#007bff", 
                        textDecoration: "none", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 8,
                        zIndex: 1001
                    }}
                >
                    <img 
                        src="/logo.png" 
                        alt="HopePlates" 
                        style={{ height: 40 }} 
                        onError={(e) => e.target.style.display = 'none'} 
                    />
                    HopePlates
                </Link>

                {/* Hamburger Button */}
                <button
                    className="hamburger-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    style={{
                        display: "none",
                        flexDirection: "column",
                        gap: "4px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px",
                        zIndex: 1001
                    }}
                >
                    <span style={{
                        width: "25px",
                        height: "3px",
                        background: "#007bff",
                        transition: "all 0.3s",
                        transform: isMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
                    }}></span>
                    <span style={{
                        width: "25px",
                        height: "3px",
                        background: "#007bff",
                        transition: "all 0.3s",
                        opacity: isMenuOpen ? "0" : "1"
                    }}></span>
                    <span style={{
                        width: "25px",
                        height: "3px",
                        background: "#007bff",
                        transition: "all 0.3s",
                        transform: isMenuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none"
                    }}></span>
                </button>

                {/* Navigation Menu */}
                <ul 
                    className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
                    style={{ 
                        display: "flex", 
                        listStyle: "none", 
                        margin: 0, 
                        padding: 0, 
                        gap: 8, 
                        alignItems: "center" 
                    }}
                >
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/donations" onClick={closeMenu}>Donations</Link></li>
                    <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                    <li><Link to="/messages" onClick={closeMenu}>Messages</Link></li>
                    {role === "admin" && (
                        <li><Link to="/pending-verifications" onClick={closeMenu}>Pending Verifications</Link></li>
                    )}
                    {role !== "admin" && role !== "ngo" && (
                        <li><Link to="/make-donation" onClick={closeMenu}>Make Donation</Link></li>
                    )}
                    <li>
                        {role ? (
                            <Link to="#" onClick={handleLogout}>Logout</Link>
                        ) : (
                            <Link to="/login" onClick={closeMenu}>Login</Link>
                        )}
                    </li>
                </ul>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .hamburger-button {
                        display: flex !important;
                    }

                    .nav-menu {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        height: 100vh;
                        width: 70%;
                        max-width: 300px;
                        background: rgba(255, 255, 255, 0.98);
                        backdrop-filter: blur(20px);
                        flex-direction: column !important;
                        justify-content: flex-start !important;
                        padding: 80px 20px 20px !important;
                        gap: 20px !important;
                        transition: right 0.3s ease-in-out;
                        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                        z-index: 1000;
                    }

                    .nav-menu.active {
                        right: 0;
                    }

                    .nav-menu li {
                        width: 100%;
                    }

                    .nav-menu li a {
                        display: block;
                        width: 100%;
                        padding: 12px 16px !important;
                        text-align: left;
                        font-size: 16px !important;
                        border-radius: 8px;
                    }

                    nav .container {
                        padding: 0 16px !important;
                    }
                }

                @media (max-width: 480px) {
                    .nav-menu {
                        width: 80%;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;