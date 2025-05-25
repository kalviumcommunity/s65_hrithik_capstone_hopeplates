const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["donor", "volunteer", "ngo", "restaurant", "event_manager", "admin"], default: "donor" },
    location: { type: String, required: true },
    verificationStatus: { type: String, enum: ["pending", "verified"], default: "pending" },
    profilePhoto: { type: String },
    images: [{ type: String }]
}, { timestamps: true })

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

module.exports = mongoose.model("User", UserSchema)