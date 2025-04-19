const mongoose = require("mongoose")
const NGO = require("../models/NGO")
const Restaurant = require("../models/Restaurant")
const EventManager = require("../models/EventManager")
const User = require("../models/userModel")

exports.verifyNGO = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid NGO ID format" })
        }

        const ngo = await NGO.findByIdAndUpdate(
            req.params.id,
            { verificationStatus: "verified" },
            { new: true }
        )

        if (!ngo) return res.status(404).json({ message: "NGO not found" })

        res.status(200).json({ message: "NGO verified successfully", ngo })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.verifyRestaurant = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Restaurant ID format" })
        }

        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { verificationStatus: "verified" },
            { new: true }
        )

        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" })

        res.status(200).json({ message: "Restaurant verified successfully", restaurant })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.verifyEventManager = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Event Manager ID format" })
        }

        const eventManager = await EventManager.findByIdAndUpdate(
            req.params.id,
            { verificationStatus: "verified" },
            { new: true }
        )

        if (!eventManager) return res.status(404).json({ message: "Event Manager not found" })

        res.status(200).json({ message: "Event Manager verified successfully", eventManager })
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


exports.verifyUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid User ID format" })
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { verificationStatus: "verified" },
            { new: true }
        )

        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json({ message: "User verified successfully", user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json({ message: "User deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}