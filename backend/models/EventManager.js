const mongoose = require("mongoose")

const EventManagerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    location: { type: String, required: true },
    contactNumber: Number,
    verificationStatus: { type: String, enum: ["pending", "verified"], default: "pending" },
}, { timestamps: true })

module.exports = mongoose.model("EventManager", EventManagerSchema)
