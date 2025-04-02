const EventManager = require("../models/EventManager")

exports.createEventManager = async (req, res) => {
    try {
        const { name, email, location, contactNumber } = req.body

        const eventManager = new EventManager({
            name,
            email,
            location,
            contactNumber,
        });

        await eventManager.save()
        res.status(201).json({ message: "Event Manager created successfully", eventManager })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};


exports.getAllEventManagers = async (req, res) => {
    try {
        const eventManagers = await EventManager.find()
        res.status(200).json(eventManagers)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.getEventManagerById = async (req, res) => {
    try {
        const eventManager = await EventManager.findById(req.params.id)
        if (!eventManager) return res.status(404).json({ message: "Event Manager not found" })

        res.status(200).json(eventManager)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.updateVerificationStatus = async (req, res) => {
    try {
        const { verificationStatus } = req.body

        const eventManager = await EventManager.findByIdAndUpdate(
            req.params.id,
            { verificationStatus },
            { new: true }
        )

        if (!eventManager) return res.status(404).json({ message: "Event Manager not found" })

        res.status(200).json({ message: "Verification status updated successfully", eventManager })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.deleteEventManager = async (req, res) => {
    try {
        const eventManager = await EventManager.findByIdAndDelete(req.params.id)
        if (!eventManager) return res.status(404).json({ message: "Event Manager not found" })

        res.status(200).json({ message: "Event Manager deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}