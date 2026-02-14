const mongoose = require("mongoose")

const DonationSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["food", "books", "clothes", "money"], required: true },
    description: { type: String, required: true },
    quantity: { type: String }, // e.g., "5 kg", "3 bags"
    amount: { type: Number }, // Only for "money" type
    pickupLocation: { type: String }, // Not required for money
    status: { type: String, enum: ["pending", "verified", "claimed", "completed", "rejected"], default: "pending" },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }]
}, { timestamps: true })

module.exports = mongoose.model("Donation", DonationSchema)