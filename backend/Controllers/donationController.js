const Donation = require("../models/Donation")

exports.createDonation = async (req, res) => {
    try {
        const { type, description, pickupLocation } = req.body
        const imagePaths = req.files ? req.files.map(file => file.path) : []

        const donation = new Donation({
            donor: req.user.id,
            type,
            description,
            pickupLocation,
            images: imagePaths
        })

        await donation.save()
        res.status(201).json({ message: "Donation created successfully", donation })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.getAllDonations = async (req, res) => {
    try {
        let donations
        if (req.user.role === "ngo") {
            donations = await Donation.find({ pickupLocation: req.user.location })
                .populate("donor", "name role _id")
                .populate("claimedBy", "name role _id")
        } else {
            donations = await Donation.find({ donor: req.user.id })
                .populate("donor", "name role _id")
                .populate("claimedBy", "name role _id")
        }
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
        const donation = await Donation.findById(req.params.id)

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" })
        }

        if (status === "claimed" && req.user.role === "ngo") {
            if (donation.status !== "pending") {
                return res.status(403).json({ message: "Donation is no longer available for claiming." })
            }
            donation.claimedBy = req.user.id
        }

        if (donation.status === "claimed" || donation.claimedBy) {
            if (donation.claimedBy?.toString() !== req.user.id && req.user.role === "ngo") {
                return res.status(403).json({ message: "Only the claiming NGO can update this donation." })
            }
        }

        donation.status = status
        await donation.save()

        await donation.populate("donor", "name role _id")
        await donation.populate("claimedBy", "name email role _id")

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