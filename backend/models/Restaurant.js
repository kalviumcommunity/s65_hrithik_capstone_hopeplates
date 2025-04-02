const mongoose = require("mongoose")

const RestaurantSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    location: { type: String, required: true },
    contactNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\+?[1-9]\d{1,14}$/.test(v); 
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    verificationStatus: { type: String, enum: ["pending", "verified"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", RestaurantSchema)