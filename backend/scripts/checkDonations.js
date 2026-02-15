const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv to read from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const checkDonations = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const Donation = mongoose.model('Donation', new mongoose.Schema({}, { strict: false })); // Use generic schema to just read

        const count = await Donation.countDocuments();
        console.log(`Total donations in DB: ${count}`);

        if (count > 0) {
            const donations = await Donation.find({}).limit(5);
            console.log('Sample donations:', JSON.stringify(donations, null, 2));
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
};

checkDonations();
