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

        let images = req.files && req.files.length > 0 ? req.files.map(file => file.path) : []

        // Populate default images if none are uploaded
        if (images.length === 0) {
            const t = (type || "").toLowerCase();
            if (t === 'food') images.push("https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80");
            else if (t === 'clothes') images.push("https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80");
            else if (t === 'books') images.push("https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80");
            else if (t === 'money') images.push("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80");
        }

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

const claimDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ error: "Donation not found" });

        if (donation.status === 'claimed' || donation.status === 'completed') {
            return res.status(400).json({ error: "Donation already claimed" });
        }

        donation.status = 'claimed';
        donation.claimedBy = req.user.id;
        await donation.save();

        // Populate donor details for the response
        const populatedDonation = await Donation.findById(donation._id)
            .populate("donor", "name email location contact");

        res.json(populatedDonation);
    } catch (err) {
        console.error("Claim donation error:", err);
        res.status(500).json({ error: "Failed to claim donation" });
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
        const count = await Donation.countDocuments({
            donor: userId,
            status: { $ne: 'rejected' }
        });
        res.json({ count });
    } catch (error) {
        console.error("Error fetching donation count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getDonationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const donations = await Donation.find({ donor: userId }).sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        console.error("Error fetching user donations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonationStatus,
    deleteDonation,
    getDonationCountByUser,
    getDonationsByUser,
    claimDonation
}