const mongoose = require("mongoose")

const RestaurantSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    location: { type: String, required: true },
    contactNumber: String,
    verificationStatus: { type: String, enum: ["pending", "verified"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", RestaurantSchema)