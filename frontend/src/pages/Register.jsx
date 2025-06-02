import { useState } from "react"
import { Link } from "react-router-dom"

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
        } catch (error) {
            console.error("Registration error:", error)
            alert("An error occurred during registration")
        }
    }

    return (
        <div className="container">
            <h1>Create an Account</h1>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Location" 
                    value={formData.location} 
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                    required 
                />
                <select 
                    value={formData.role} 
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                    <option value="donor">Donor</option>
                    <option value="ngo">NGO</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="event_manager">Event Manager</option>
                </select>

                <label>Profile Photo (required):</label>
                <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={e => setProfilePhoto(e.target.files[0])}
                />
                {profilePhoto && (
                    <div style={{ margin: "10px 0" }}>
                        <img
                            src={URL.createObjectURL(profilePhoto)}
                            alt="profile preview"
                            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: "1px solid #ccc" }}
                        />
                    </div>
                )}
                <label>About Images (you can select multiple):</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => setAboutImages(prev => [...prev, ...Array.from(e.target.files)])}
                />
                {aboutImages.length > 0 && (
                    <div style={{ display: "flex", gap: 10, margin: "10px 0", flexWrap: "wrap" }}>
                        {aboutImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(img)}
                                alt="about preview"
                                style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: "1px solid #ccc" }}
                            />
                        ))}
                    </div>
                )}
                <button type="submit">Register</button>
                <p className="text-center mt-2">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Register