import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Navbar = () => {
    const [role, setRole] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1]))
            setRole(user.role)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token") 
        setRole(null) 
        navigate("/login") 
    }

    return (
        <nav>
            <div className="container">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/donations">Donations</Link></li>
                    <li><Link to="/profile">Profile</Link></li>

                    
                    {role === "admin" && (
                        <>
                            <li><Link to="/pending-verifications">Pending Verifications</Link></li>
                        </>
                    )}

                    
                    {role === "event_manager" && (
                        <>
                            <li><Link to="/manage-events">Manage Events</Link></li>
                        </>
                    )}

                    
                    {role === "restaurant" && (
                        <>
                            <li><Link to="/manage-donations">Manage Donations</Link></li>
                        </>
                    )}

                    
                    {role === "ngo" && (
                        <>
                            <li><Link to="/view-donations">View Donations</Link></li>
                        </>
                    )}

                    
                    <li style={{ marginLeft: "auto" }}>
                        {role ? (
                            <Link to="#" onClick={handleLogout}>
                                Logout
                            </Link>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar