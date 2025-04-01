const mongoose =  require('mongoose')
const NGOSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    verificationStatus: { type: String, enum: ["pending", "verified"], default: "pending" },
    upiId: String,
    location: { type: String, required: true },
    peopleByAgeGroup: {
        "1-10": { type: Number, default: 0 },
        "11-20": { type: Number, default: 0 },
        "21-30": { type: Number, default: 0 },
        "31-40": { type: Number, default: 0 },
        "41-50": { type: Number, default: 0 },
        "51-60": { type: Number, default: 0 },
        "61-70": { type: Number, default: 0 },
        "71-80": { type: Number, default: 0 },
        "81-90": { type: Number, default: 0 },
        "91-100": { type: Number, default: 0 }
    }
}, { timestamps: true })

module.exports = mongoose.model("NGO", NGOSchema)