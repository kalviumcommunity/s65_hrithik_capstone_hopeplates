import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
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
            localStorage.setItem("user", JSON.stringify(data)) // Store user info
            navigate("/dashboard")
        } catch (err) {
            console.error(err.message)
            alert(err.message)
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Immersive Background - Dynamic */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover animate-slow-zoom filter blur-sm scale-110"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
            </div>

            {/* Floating Glass Card - Dark Mode */}
            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 glass-dark rounded-[40px] overflow-hidden m-4">

                {/* Visual Side (Left in Box) */}
                <div className="hidden md:flex flex-col justify-center p-12 bg-white/5 text-white relative border-r border-white/5">
                    <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-blue-500">favorite</span>
                        <span className="font-semibold tracking-tight text-lg">HopePlates</span>
                    </Link>
                    <h2 className="text-4xl font-bold leading-tight mb-4">Welcome back to the movement.</h2>
                    <p className="text-zinc-300 text-lg">Your generosity has already served over 12,000 meals. Let's keep the momentum going.</p>
                </div>

                {/* Form Side */}
                <div className="p-10 md:p-14 bg-transparent backdrop-blur-md">
                    <div className="mb-10">
                        <h3 className="text-3xl font-bold text-white mb-2">Sign In</h3>
                        <p className="text-zinc-400">Enter your credentials to access your dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-500"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="group">
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500" />
                                <span className="text-zinc-400">Remember me</span>
                            </label>
                            <a href="#" className="text-blue-400 hover:underline font-medium">Forgot Password?</a>
                        </div>

                        <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 font-bold">
                            Continue
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-zinc-500">
                        New here? <Link to="/register" className="text-blue-400 font-semibold hover:underline">Create an account</Link>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slowZoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slowZoom 20s infinite alternate linear;
                }
            `}</style>
        </div>
    )
}

export default Login