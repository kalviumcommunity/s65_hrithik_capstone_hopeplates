import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui"

const MakeDonation = () => {
    const [formData, setFormData] = useState({
        title: "",
        type: "food",
        description: "",
        quantity: "",
        amount: "",
        pickupLocation: "",
    })
    const [images, setImages] = useState([])
    const [locLoading, setLocLoading] = useState(false)
    const navigate = useNavigate()


    const handleGetLocation = async () => {
        setLocLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    const data = await res.json()
                    setFormData(f => ({
                        ...f,
                        pickupLocation: data.display_name || `${latitude},${longitude}`
                    }))
                } catch (err) {
                    setFormData(f => ({
                        ...f,
                        pickupLocation: `${latitude},${longitude}`
                    }))
                }
                setLocLoading(false)
            }, (err) => {
                alert("Location access denied or unavailable.")
                setLocLoading(false)
            })
        } else {
            alert("Geolocation is not supported by this browser.")
            setLocLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (!token) {
            alert("Please login first")
            navigate("/login")
            return
        }

        try {
            const form = new FormData()
            form.append("title", formData.title)
            form.append("type", formData.type)
            form.append("description", formData.description)
            form.append("pickupLocation", formData.pickupLocation)

            if (formData.type === 'money') {
                form.append("amount", formData.amount)
            } else {
                form.append("quantity", formData.quantity)
            }

            images.forEach(img => form.append("images", img))

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/donations`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: form
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || errorData.message || "Failed to create donation")
            }
            alert("Donation created successfully!")
            navigate("/donations")
        } catch (err) {
            console.error("Error creating donation:", err.message)
            alert(err.message)
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-20 flex justify-center items-start">
            <div className="w-full max-w-2xl bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">Create Donation</h1>
                    <p className="text-[#86868B] mt-2">Share your impact with the world.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3 text-[#1D1D1F] focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none transition-all"
                            placeholder="e.g. Fresh Vegetables Bundle"
                            required
                        />
                    </div>

                    {/* Type Selection - Apple Pill Style */}
                    <div>
                        <label className="block text-sm font-medium text-[#1D1D1F] mb-3">Category</label>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {['food', 'clothes', 'books', 'money'].map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: t })}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all capitalize ${formData.type === t
                                            ? 'bg-[#1D1D1F] text-white shadow-md'
                                            : 'bg-[#F5F5F7] text-[#86868B] hover:bg-[#E8E8ED]'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {formData.type === 'money' ? (
                        <div>
                            <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Amount ($)</label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Quantity</label>
                            <input
                                type="text"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3"
                                placeholder="e.g. 5 bags, 10 items"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3 min-h-[120px]"
                            placeholder="Tell us about your donation..."
                            required
                        />
                    </div>

                    {/* Location */}
                    {formData.type !== 'money' && (
                        <div>
                            <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Pickup Location</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={formData.pickupLocation}
                                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                                    className="flex-1 rounded-xl border border-[#D2D2D7] px-4 py-3"
                                    placeholder="Enter address"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={locLoading}
                                    className="bg-[#E8E8ED] text-[#1D1D1F] px-4 py-3 rounded-xl hover:bg-[#D2D2D7] transition-colors"
                                >
                                    <span className="material-symbols-outlined">{locLoading ? 'sync' : 'my_location'}</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Photos</label>
                        <div className="grid grid-cols-4 gap-4">
                            <label className="aspect-square rounded-2xl border-2 border-dashed border-[#D2D2D7] flex items-center justify-center cursor-pointer hover:border-[#0071E3] hover:text-[#0071E3] transition-colors text-[#86868B]">
                                <input type="file" multiple accept="image/*" className="hidden" onChange={e => setImages([...e.target.files])} />
                                <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                            </label>
                            {/* Preview */}
                            {Array.from(images).map((img, idx) => (
                                <div key={idx} className="aspect-square rounded-2xl overflow-hidden relative group">
                                    <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#0071E3] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#0077ED] shadow-xl shadow-blue-500/20 mt-8">
                        Post Donation
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default MakeDonation