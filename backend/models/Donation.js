const mongoose = require("mongoose")

const DonationSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["food", "books", "clothes"] },
    description: String,
    pickupLocation: String,
    status: { type: String, enum: ["pending", "claimed", "completed"], default: "pending" },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }] 
}, { timestamps: true })

module.exports = mongoose.model("Donation", DonationSchema)