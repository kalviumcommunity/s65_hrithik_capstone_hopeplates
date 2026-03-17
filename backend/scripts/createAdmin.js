require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists:', existingAdmin.email);
            existingAdmin.password = 'RootUser@123';
            await existingAdmin.save();
            console.log('Admin password updated to: RootUser@123');
            process.exit(0);
        }

        const adminUser = new User({
            name: 'Root Admin',
            email: 'root@hopeplates.com',
            password: 'RootUser@123', // Will be hashed by pre-save hook
            role: 'admin',
            location: 'Headquarters',
            verificationStatus: 'verified'
        });

        await adminUser.save();
        console.log('Root Admin created successfully!');
        console.log('Email: root@hopeplates.com');
        console.log('Password: RootUser@123');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
