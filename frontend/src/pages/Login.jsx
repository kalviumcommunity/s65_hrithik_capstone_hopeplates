import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/login", {
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
            navigate("/donations") // Redirect to dashboard
        } catch (err) {
            console.error(err.message)
            alert(err.message)
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background-light">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center items-center p-8 md:p-16">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl">favorite</span>
                        </div>
                        <h1 className="text-xl font-800 tracking-tight text-[#181311]">GivingHeart</h1>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-[#181311]">Welcome back</h2>
                        <p className="mt-2 text-[#896f61]">Please enter your details to sign in.</p>
                    </div>

                    <form className="mt-8 space-y-6 bg-transparent shadow-none p-0 border-none" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#181311] mb-1">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-xl border border-primary/20 px-4 py-3 text-[#181311] placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm bg-white"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#181311] mb-1">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    className="block w-full rounded-xl border border-primary/20 px-4 py-3 text-[#181311] placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm bg-white"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#896f61]">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-primary hover:text-primary/80">Forgot password?</a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-xl bg-primary px-3 py-4 text-sm font-bold leading-6 text-white shadow-lg shadow-primary/25 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all active:scale-[0.98]"
                        >
                            Sign in
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#896f61]">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-primary hover:text-primary/80">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Hero */}
            <div className="hidden md:block relative bg-[#181311]">
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#181311] via-transparent to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-16 text-white">
                    <h2 className="text-4xl font-bold mb-6">"We rise by lifting others."</h2>
                    <p className="text-lg text-white/80 max-w-lg">Join our community of over 20,000 donors making a real difference in people's lives every single day.</p>
                </div>
            </div>
        </div>
    )
}

export default Login