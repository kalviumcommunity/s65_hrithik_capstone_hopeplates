const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const {generateToken} = require('../utils/jwt')

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, location, role } = req.body

        if (role === "admin") {
            const existingAdmin = await User.findOne({ role: "admin" })
            if (existingAdmin) {
                return res.status(403).json({ message: "An admin account already exists. Only one admin is allowed." })
            }
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })
        const verificationStatus = role === "admin" ? "verified" : ["ngo", "restaurant", "event_manager"].includes(role) ? "pending" : "verified"

        const user = new User({
            name,
            email,
            password,
            location,
            role,
            verificationStatus
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
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        if (
            user.role !== "donor" &&
            user.verificationStatus !== "verified"
        ) {
            return res.status(403).json({ message: "Your account is pending admin verification." })
        }

        const token = generateToken(user)
        
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                verificationStatus: user.verificationStatus
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id) 
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
            images: user.images,
            profilePhoto: user.profilePhoto 
        })
    } catch (err) {
        console.error("Error fetching user profile:", err.message)
        res.status(500).json({ message: "Server error", error: err.message })
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

exports.getPendingVerifications = async (req, res) => {
    try {
        console.log("Fetching pending verifications...")

        const pendingUsers = await User.find({
            verificationStatus: "pending",
            role: { $in: ["ngo", "restaurant", "event_manager"] }, 
        })

        console.log("Pending Verifications:", pendingUsers)

        res.status(200).json({ pendingUsers })
    } catch (err) {
        console.error("Error in getPendingVerifications:", err.message)
        res.status(500).json({ error: err.message })
    }
}

exports.uploadUserImages = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ message: "User not found" })

        const imagePaths = req.files.map(file => file.path)
        user.images = user.images.concat(imagePaths)
        await user.save()

        res.status(200).json({ message: "Images uploaded", images: user.images })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.uploadProfilePhoto = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ message: "User not found" })
        user.profilePhoto = req.file.path
        await user.save()
        res.status(200).json({ message: "Profile photo uploaded", profilePhoto: user.profilePhoto })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteAboutImage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ message: "User not found" })
        const { imagePath } = req.body
        user.images = user.images.filter(img => img !== imagePath)
        await user.save()
        res.status(200).json({ message: "Image deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}