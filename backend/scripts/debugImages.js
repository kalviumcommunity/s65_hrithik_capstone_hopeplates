const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Donation = require('../models/Donation');

dotenv.config({ path: path.join(__dirname, '../.env') });

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const donations = await Donation.find({}, 'title type images');
        console.log(JSON.stringify(donations, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
};

check();
