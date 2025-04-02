const NGO = require("../models/NGO")
const Restaurant = require("../models/Restaurant")
const EventManager = require("../models/EventManager")


exports.verifyNGO = async (req, res) => {
    try {
        const ngo = await NGO.findByIdAndUpdate(
            req.params.id,
            { verificationStatus: "verified" },
            { new: true }
        )

        if (!ngo) return res.status(404).json({ message: "NGO not found" })

        res.status(200).json({ message: "NGO verified successfully", ngo })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.verifyRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { verificationStatus: "verified" },
            { new: true }
        )

        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.status(200).json({ message: "Restaurant verified successfully", restaurant });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.verifyEventManager = async (req, res) => {
    try {
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
        const pendingNGOs = await NGO.find({ verificationStatus: "pending" })
        const pendingRestaurants = await Restaurant.find({ verificationStatus: "pending" })
        const pendingEventManagers = await EventManager.find({ verificationStatus: "pending" })

        res.status(200).json({
            pendingNGOs,
            pendingRestaurants,
            pendingEventManagers,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}