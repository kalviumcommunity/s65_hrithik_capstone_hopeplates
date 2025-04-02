const Donation = require("../models/Donation")

exports.createDonation = async (req, res) => {
    try {
        const { type, description, pickupLocation } = req.body

        const donation = new Donation({
            donor: req.user.id, 
            type,
            description,
            pickupLocation,
        })

        await donation.save()
        res.status(201).json({ message: "Donation created successfully", donation })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate("donor", "name email")
        res.status(200).json(donations)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).populate("donor", "name email");
        if (!donation) return res.status(404).json({ message: "Donation not found" });

        res.status(200).json(donation)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};


exports.updateDonationStatus = async (req, res) => {
    try {
        const { status } = req.body

        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )

        if (!donation) return res.status(404).json({ message: "Donation not found" })

        res.status(200).json({ message: "Donation status updated successfully", donation })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndDelete(req.params.id)
        if (!donation) return res.status(404).json({ message: "Donation not found" })

        res.status(200).json({ message: "Donation deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}