import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        role: "donor",
    })
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [aboutImages, setAboutImages] = useState(null) // Multiple images
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await response.json()
            if (!response.ok) {
                alert(data.message)
                return
            }

            // Auto Login
            const loginRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })
            const loginData = await loginRes.json()
            if (!loginRes.ok) throw new Error(loginData.message)

            const token = loginData.token

            // Upload Photo
            if (profilePhoto) {
                const formImg = new FormData()
                formImg.append("profilePhoto", profilePhoto)
                await fetch(`${import.meta.env.VITE_API_URL}/api/users/upload-profile-photo`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formImg
                })
            }

            // Upload About Images (Multiple)
            if (aboutImages && aboutImages.length > 0) {
                const formAbout = new FormData()
                Array.from(aboutImages).forEach(file => {
                    formAbout.append("images", file)
                })
                await fetch(`${import.meta.env.VITE_API_URL}/api/users/upload-images`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formAbout
                })
            }

            alert("Welcome to HopePlates!")
            navigate("/donations")
        } catch (error) {
            console.error("Registration error:", error)
            alert("An error occurred during registration")
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-10">
            {/* Immersive Background - Dynamic Action Shot */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                    alt="Community Action"
                    className="w-full h-full object-cover animate-slow-zoom filter blur-sm scale-110"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
            </div>

            {/* Glass Card */}
            <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-5 glass-dark rounded-[40px] overflow-hidden m-4">

                {/* Visual Side (Left) */}
                <div className="hidden md:flex md:col-span-2 flex-col justify-end p-12 bg-white/5 text-white relative border-r border-white/5">
                    <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-blue-500">favorite</span>
                        <span className="font-semibold tracking-tight text-lg">HopePlates</span>
                    </Link>
                    <h2 className="text-3xl font-bold leading-tight mb-4">Start your journey.</h2>
                    <p className="text-zinc-300">Join a network where transparency meets direct impact. See exactly where your help goes.</p>
                </div>

                {/* Form Side */}
                <div className="md:col-span-3 p-10 bg-transparent backdrop-blur-md overflow-y-auto max-h-[90vh]">
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold text-white mb-1">Create Account</h3>
                        <p className="text-zinc-400">Fill in your details to get started.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Full Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-500" required placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Location</label>
                                <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-500" required placeholder="City, Country" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Email</label>
                            <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-500" required placeholder="you@example.com" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Password</label>
                            <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-500" required placeholder="••••••••" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">I am a...</label>
                            <div className="relative">
                                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer">
                                    <option value="donor" className="text-black">Donor (Individual)</option>
                                    <option value="ngo" className="text-black">NGO</option>
                                    <option value="restaurant" className="text-black">Restaurants</option>
                                    <option value="event_manager" className="text-black">Event Manager</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Profile Photo (Required)</label>
                            <div className="flex items-center gap-4">
                                <label className="flex-1 h-32 border-2 border-dashed border-zinc-700 hover:border-blue-500 hover:bg-blue-500/10 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group">
                                    <span className="material-symbols-outlined text-3xl text-zinc-500 group-hover:text-blue-500 transition-colors">account_circle</span>
                                    <span className="text-xs text-zinc-600 mt-2 group-hover:text-blue-400">Upload Profile Pic</span>
                                    <input type="file" className="hidden" onChange={e => setProfilePhoto(e.target.files[0])} accept="image/*" required />
                                </label>
                                {profilePhoto && (
                                    <div className="h-32 w-32 rounded-xl overflow-hidden border border-white/10">
                                        <img src={URL.createObjectURL(profilePhoto)} className="w-full h-full object-cover" alt="Preview" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">About Images (Showcase your work)</label>
                            <div className="flex items-center gap-4">
                                <label className="flex-1 h-32 border-2 border-dashed border-zinc-700 hover:border-green-500 hover:bg-green-500/10 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group">
                                    <span className="material-symbols-outlined text-3xl text-zinc-500 group-hover:text-green-500 transition-colors">add_photo_alternate</span>
                                    <span className="text-xs text-zinc-600 mt-2 group-hover:text-green-400">Upload Gallery (Max 10)</span>
                                    <input type="file" className="hidden" onChange={e => setAboutImages(e.target.files)} accept="image/*" multiple />
                                </label>
                                {aboutImages && aboutImages.length > 0 && (
                                    <div className="h-32 w-32 rounded-xl border border-white/10 flex items-center justify-center bg-white/5">
                                        <span className="text-white font-bold">{aboutImages.length} Files</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-500 py-4 rounded-xl text-lg shadow-lg shadow-blue-900/20 mt-4 transition-all hover:scale-[1.02]">
                            Join Now
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-zinc-500">
                        Already a member? <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-400">Log in</Link>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes slowZoom {
                    0% { transform: scale(1.1); }
                    100% { transform: scale(1.2); }
                }
                .animate-slow-zoom {
                    animation: slowZoom 20s infinite alternate linear;
                }
            `}</style>
        </div>
    )
}

export default Register