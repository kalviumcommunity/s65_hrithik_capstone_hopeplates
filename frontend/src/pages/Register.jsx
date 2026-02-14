import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        role: "donor",
    })
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [aboutImages, setAboutImages] = useState([])
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await response.json()
            if (!response.ok) {
                alert(data.message)
                return
            }

            const loginRes = await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })
            const loginData = await loginRes.json()
            if (!loginRes.ok) {
                alert(loginData.message)
                return
            }
            const token = loginData.token

            if (profilePhoto) {
                const formImg = new FormData()
                formImg.append("profilePhoto", profilePhoto)
                await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/upload-profile-photo", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formImg
                })
            }

            if (aboutImages.length > 0) {
                const formImg = new FormData()
                aboutImages.forEach(img => formImg.append("images", img))
                await fetch("https://s65-hrithik-capstone-hopeplates.onrender.com/api/users/upload-images", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formImg
                })
            }

            alert("Registration successful!")
            navigate("/donations") // Redirect to dashboard
        } catch (error) {
            console.error("Registration error:", error)
            alert("An error occurred during registration")
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
                        <h2 className="text-3xl font-bold tracking-tight text-[#181311]">Join the Movement</h2>
                        <p className="mt-2 text-[#896f61]">Create an account to verify your contributions and track your impact.</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[#181311] mb-1">Full Name</label>
                                <input id="name" type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="block w-full rounded-xl border border-primary/20 px-4 py-3 text-[#181311] placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm bg-white" />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-[#181311] mb-1">City/Location</label>
                                <input id="location" type="text" placeholder="Your city" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required className="block w-full rounded-xl border border-primary/20 px-4 py-3 text-[#181311] placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm bg-white" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#181311] mb-1">Email address</label>
                            <input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="block w-full rounded-xl border border-primary/20 px-4 py-3 text-[#181311] placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm bg-white" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#181311] mb-1">Password</label>
                            <input id="password" type="password" placeholder="Create a password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="block w-full rounded-xl border border-primary/20 px-4 py-3 text-[#181311] placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm bg-white" />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-[#181311] mb-1">I am a...</label>
                            <select id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="block w-full rounded-xl border border-primary/20 px-4 py-3 text-[#181311] bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm">
                                <option value="donor">Donor (Individual)</option>
                                <option value="ngo">NGO (Organization)</option>
                                <option value="restaurant">Restaurant/Business</option>
                                <option value="event_manager">Event Manager</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#181311] mb-2">Profile Photo (Required)</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="profile-photo" className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary/20 border-dashed rounded-xl cursor-pointer bg-white hover:bg-primary/5 transition-colors">
                                    {profilePhoto ? (
                                        <img src={URL.createObjectURL(profilePhoto)} alt="Preview" className="h-full object-contain p-2" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <span className="material-symbols-outlined text-primary mb-2">cloud_upload</span>
                                            <p className="mb-2 text-sm text-[#896f61]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        </div>
                                    )}
                                    <input id="profile-photo" type="file" className="hidden" accept="image/*" onChange={e => setProfilePhoto(e.target.files[0])} required />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#181311] mb-2">Additional Images (Optional)</label>
                            <input type="file" multiple accept="image/*" onChange={e => setAboutImages(prev => [...prev, ...Array.from(e.target.files)])} className="block w-full text-sm text-[#896f61] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            {aboutImages.length > 0 && (
                                <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                                    {aboutImages.map((img, idx) => (
                                        <img key={idx} src={URL.createObjectURL(img)} alt="preview" className="h-16 w-16 object-cover rounded-lg border border-primary/10" />
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="flex w-full justify-center rounded-xl bg-primary px-3 py-4 text-sm font-bold leading-6 text-white shadow-lg shadow-primary/25 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all active:scale-[0.98]">
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#896f61]">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary hover:text-primary/80">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Hero */}
            <div className="hidden md:block relative bg-[#181311]">
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#181311] via-transparent to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-16 text-white">
                    <h2 className="text-4xl font-bold mb-6">"Start your journey of giving."</h2>
                    <p className="text-lg text-white/80 max-w-lg">Become part of a network that connects surplus food to those who need it most. Efficient, transparent, and impactful.</p>
                </div>
            </div>
        </div>
    )
}

export default Register