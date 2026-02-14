const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/userModel");
const Donation = require("../models/Donation");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const populateDonations = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        // Fetch users to assign as donors and claimants
        const users = await User.find({});
        const donors = users.filter(u => u.role === 'donor');
        const ngos = users.filter(u => u.role === 'ngo');

        if (donors.length === 0 || ngos.length === 0) {
            console.error("Not enough donors or NGOs found. Please run populateUsers.js first.");
            process.exit(1);
        }

        const donationTemplates = [
            { title: "Excess Bread", description: "50 loaves of fresh bread", type: "food", quantity: "50 loaves", pickupLocation: "Bakery Street" },
            { title: "Winter Clothes", description: "Jackets and sweaters", type: "clothes", quantity: "2 bags", pickupLocation: "Community Hall" },
            { title: "Rice Bags", description: "10kg Rice bags", type: "food", quantity: "5 bags", pickupLocation: "Main Market" },
            { title: "Novels", description: "Assorted novels", type: "books", quantity: "20 books", pickupLocation: "Library Road" },
            { title: "Canned Soup", description: "Tomato and Chicken soup", type: "food", quantity: "30 cans", pickupLocation: "Grocery Lane" }
        ];

        let createdCount = 0;

        for (const donor of donors) {
            for (let i = 0; i < 3; i++) { // Create 3 donations per donor
                const template = donationTemplates[Math.floor(Math.random() * donationTemplates.length)];

                // Randomly select status
                const statuses = ["pending", "claimed", "completed"];
                const status = statuses[Math.floor(Math.random() * statuses.length)];

                let claimedBy = null;
                // If claimed or completed, assign an NGO
                if (status === "claimed" || status === "completed") {
                    claimedBy = ngos[Math.floor(Math.random() * ngos.length)]._id;
                }

                const newDonation = new Donation({
                    donor: donor._id,
                    title: template.title,
                    type: template.type,
                    description: template.description,
                    quantity: template.quantity,
                    pickupLocation: template.pickupLocation,
                    status: status,
                    claimedBy: claimedBy,
                    images: []
                });

                await newDonation.save();
                createdCount++;
            }
        }

        console.log(`✅ Successfully created ${createdCount} donations.`);
        process.exit(0);
    } catch (error) {
        console.error("Error populating donations:", error);
        process.exit(1);
    }
};

populateDonations();
