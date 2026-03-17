const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/userModel");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const usersToCreate = [
    { name: "Hrithik", role: "admin", email: "hrithik@hopeplates.com" },
    { name: "Paari", role: "donor", email: "paari@hopeplates.com" },
    { name: "Yokesh", role: "ngo", email: "yokesh@hopeplates.com" },
    { name: "Ramesh", role: "volunteer", email: "ramesh@hopeplates.com" },
    { name: "Mohan", role: "restaurant", email: "mohan@hopeplates.com" },
    { name: "Suresh", role: "event_manager", email: "suresh@hopeplates.com" },
    { name: "Ganesh", role: "donor", email: "ganesh@hopeplates.com" },
    { name: "Dinesh", role: "ngo", email: "dinesh@hopeplates.com" },
    { name: "Mahesh", role: "volunteer", email: "mahesh@hopeplates.com" },
    { name: "Naresh", role: "restaurant", email: "naresh@hopeplates.com" }
];

const populateUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        for (const user of usersToCreate) {
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                console.log(`User ${user.name} already exists.`);
                continue;
            }

            const newUser = new User({
                name: user.name,
                email: user.email,
                password: "Password@123", // Will be hashed
                role: user.role,
                location: "Chennai",
                verificationStatus: "verified" // Skip admin approval
            });

            await newUser.save();
            console.log(`✅ Created user: ${user.name} (${user.role})`);
        }

        console.log("\nAll users processed!");
        process.exit(0);
    } catch (error) {
        console.error("Error populating users:", error);
        process.exit(1);
    }
};

populateUsers();
