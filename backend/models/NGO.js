const mongoose = require('mongoose')

const NGOSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    verificationStatus: { type: String, enum: ["pending", "verified"], default: "pending" },
    location: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("NGO", NGOSchema)