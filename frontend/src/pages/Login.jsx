import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            const data = await response.json()
            localStorage.setItem("token", data.token)
            alert("Login successful!")
            navigate("/profile")
        } catch (err) {
            console.error(err.message)
            alert(err.message)
        }
    }

    return (
        <div className="container">
            <h1>Login to HopePlates</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
                <p className="text-center mt-2">
                    Don't have an account? <Link to="/register" style={{ color: "var(--primary-color)" }}>Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login