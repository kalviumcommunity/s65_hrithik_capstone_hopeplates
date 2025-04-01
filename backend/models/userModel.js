const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["donor", "volunteer", "ngo", "restaurant", "event_manager","admin"], default: "donor" },
    location: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)