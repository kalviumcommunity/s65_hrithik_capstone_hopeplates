const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Donation = require('../models/Donation');

// Configure dotenv
dotenv.config({ path: path.join(__dirname, '../.env') });

const defaults = {
    food: "https://image.lexica.art/full_webp/043e7428-212d-487a-9a99-52e460492cb4",
    clothes: "https://image.lexica.art/full_webp/26abe3c2-26da-4966-880c-2553e6c0c2bc",
    books: "https://image.lexica.art/full_webp/01dfbfbe-20db-424a-8534-192533ae9e4a",
    money: "https://image.lexica.art/full_webp/0014022a-14d2-4467-916c-e408ec968393"
};

const populate = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const donations = await Donation.find({ $or: [{ images: { $size: 0 } }, { images: { $exists: false } }] });
        console.log(`Found ${donations.length} donations without images.`);

        for (const donation of donations) {
            const type = (donation.type || "").toLowerCase();
            const defaultImg = defaults[type];

            if (defaultImg) {
                donation.images = [defaultImg];
                await donation.save();
                console.log(`Updated donation ${donation._id} (${type}) with default image.`);
            } else {
                console.log(`Skipping donation ${donation._id}: Unknown type '${type}'`);
            }
        }

        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

populate();
