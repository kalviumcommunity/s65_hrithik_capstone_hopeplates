const Donation = require("../models/Donation")

const createDonation = async (req, res) => {
    try {
        const { title, type, description, pickupLocation, quantity, amount } = req.body
        const userId = req.user.id

        if (!title || !type || !description) {
            return res.status(400).json({ error: "Please provide all required fields (title, type, description)" })
        }

        if (type === 'money' && !amount) {
            return res.status(400).json({ error: "Amount is required for money donations." })
        }

        const images = req.files ? req.files.map(file => file.path) : []

        const newDonation = new Donation({
            donor: userId,
            title,
            type,
            description,
            quantity,
            amount,
            pickupLocation,
            images
        })

        await newDonation.save()
        res.status(201).json(newDonation)
    } catch (err) {
        res.status(500).json({ error: "Failed to create donation" })
    }
}

const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate("donor", "name email contact")
        res.status(200).json(donations)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch donations" })
    }
}

const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).populate("donor", "name email");
        if (!donation) return res.status(404).json({ error: "Donation not found" });
        res.json(donation);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

const updateDonationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["pending", "verified", "claimed", "completed", "rejected"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!donation) return res.status(404).json({ error: "Donation not found" });

        res.json(donation);
    } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
    }
};

const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndDelete(req.params.id);
        if (!donation) return res.status(404).json({ error: "Donation not found" });
        res.json({ message: "Donation deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete donation" });
    }
};

const getDonationCountByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const count = await Donation.countDocuments({ donor: userId });
        res.json({ count });
    } catch (error) {
        console.error("Error fetching donation count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonationStatus,
    deleteDonation,
    getDonationCountByUser
}