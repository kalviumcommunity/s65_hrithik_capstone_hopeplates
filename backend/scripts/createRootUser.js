const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");

// Load environment variables
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });

const createRootUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        // Check if root user already exists
        const existingRoot = await User.findOne({ email: "admin@hopeplates.com" });
        if (existingRoot) {
            console.log("Root user already exists!");
            console.log("Email: admin@hopeplates.com");
            process.exit(0);
        }

        // Create root user
        const rootUser = new User({
            name: "Admin",
            email: "admin@hopeplates.com",
            password: "Admin@123", // This will be hashed by the pre-save hook
            role: "admin",
            location: "Headquarters",
            verificationStatus: "verified"
        });

        await rootUser.save();
        console.log("✅ Root user created successfully!");
        console.log("Email: admin@hopeplates.com");
        console.log("Password: Admin@123");
        console.log("Please change the password after first login!");

        process.exit(0);
    } catch (error) {
        console.error("Error creating root user:", error);
        process.exit(1);
    }
};

createRootUser();
