const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, location, role } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "Email already exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword,
            location,
            role
        })
        await user.save()
        res.status(201).json({ message: "User registered successfully", user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "User not found" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })
        res.status(200).json({ message: "Login successful", user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, location } = req.body
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, location },
            { new: true }
        )
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json({ message: "User profile updated successfully", user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}