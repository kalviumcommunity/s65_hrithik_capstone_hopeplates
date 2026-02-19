const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/userModel");
const Donation = require("../models/Donation");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const defaults = {
    food: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80",
    clothes: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    books: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80",
    money: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80"
};

const populateDonations = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        // Clear existing donations
        await Donation.deleteMany({});
        console.log("Cleared existing donations.");

        // Fetch users to assign as donors and claimants
        const users = await User.find({});
        // If roles aren't strictly correct in test data, just grab some
        let donors = users.filter(u => u.role === 'donor');
        let ngos = users.filter(u => u.role === 'ngo');

        // Fallback for test env if roles missing
        if (donors.length === 0 && users.length > 0) donors = [users[0]];
        if (ngos.length === 0 && users.length > 0) ngos = [users[users.length - 1]];

        const donationTemplates = [
            { title: "Excess Bread", description: "50 loaves of fresh bread", type: "food", quantity: "50 loaves", pickupLocation: "Bakery Street" },
            { title: "Winter Clothes", description: "Jackets and sweaters", type: "clothes", quantity: "2 bags", pickupLocation: "Community Hall" },
            { title: "Rice Bags", description: "10kg Rice bags", type: "food", quantity: "5 bags", pickupLocation: "Main Market" },
            { title: "Novels", description: "Assorted novels", type: "books", quantity: "20 books", pickupLocation: "Library Road" },
            { title: "School Fund", description: "Money for school supplies", type: "money", amount: "500", quantity: "N/A", pickupLocation: "N/A" },
            { title: "Canned Soup", description: "Tomato and Chicken soup", type: "food", quantity: "30 cans", pickupLocation: "Grocery Lane" }
        ];

        let createdCount = 0;

        for (const donor of donors) {
            // Create a few donations per donor
            for (let i = 0; i < 4; i++) {
                const template = donationTemplates[Math.floor(Math.random() * donationTemplates.length)];

                const statuses = ["pending", "claimed", "completed"];
                const status = statuses[Math.floor(Math.random() * statuses.length)];

                let claimedBy = null;
                if ((status === "claimed" || status === "completed") && ngos.length > 0) {
                    claimedBy = ngos[Math.floor(Math.random() * ngos.length)]._id;
                }

                const newDonation = new Donation({
                    donor: donor._id,
                    title: template.title,
                    type: template.type,
                    description: template.description,
                    quantity: template.quantity,
                    amount: template.amount,
                    pickupLocation: template.pickupLocation,
                    status: status,
                    claimedBy: claimedBy,
                    images: [defaults[template.type]] // Explicitly set default image
                });

                await newDonation.save();
                createdCount++;
            }
        }

        console.log(`✅ Successfully repopulated ${createdCount} donations with default images.`);
        process.exit(0);
    } catch (error) {
        console.error("Error populating donations:", error);
        process.exit(1);
    }
};

populateDonations();
