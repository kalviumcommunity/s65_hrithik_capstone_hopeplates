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
            navigate("/donations")
        } catch (err) {
            console.error(err.message)
            alert(err.message)
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Floating Glass Card */}
            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] shadow-2xl overflow-hidden m-4">

                {/* Visual Side (Left in Box) */}
                <div className="hidden md:flex flex-col justify-center p-12 bg-black/20 text-white relative">
                    <div className="absolute top-8 left-8 flex items-center gap-2">
                        <span className="material-symbols-outlined">favorite</span>
                        <span className="font-semibold tracking-tight text-lg">HopePlates</span>
                    </div>
                    <h2 className="text-4xl font-bold leading-tight mb-4">Welcome back to the movement.</h2>
                    <p className="text-white/80 text-lg">Your generosity has already served over 12,000 meals. Let's keep the momentum going.</p>
                </div>

                {/* Form Side */}
                <div className="p-10 md:p-14 bg-white/80 md:bg-white/90 backdrop-blur-md">
                    <div className="mb-10">
                        <h3 className="text-3xl font-bold text-[#1D1D1F] mb-2">Sign In</h3>
                        <p className="text-[#86868B]">Enter your credentials to access your dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-2 group-focus-within:text-[#0071E3] transition-colors">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-[#1D1D1F] focus:ring-2 focus:ring-[#0071E3]/50 transition-all outline-none"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="group">
                            <label className="block text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-2 group-focus-within:text-[#0071E3] transition-colors">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-[#1D1D1F] focus:ring-2 focus:ring-[#0071E3]/50 transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300 text-[#0071E3] focus:ring-[#0071E3]" />
                                <span className="text-[#86868B]">Remember me</span>
                            </label>
                            <a href="#" className="text-[#0071E3] hover:underline font-medium">Forgot Password?</a>
                        </div>

                        <Button type="submit" className="w-full bg-[#1D1D1F] text-white hover:bg-black py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                            Continue
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-[#86868B]">
                        New here? <Link to="/register" className="text-[#0071E3] font-semibold hover:underline">Create an account</Link>
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