import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const makeAdmin = async (email) => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
        const user = await User.findOneAndUpdate({ email }, { isAdmin: true }, { new: true });
        if (user) {
            console.log(`User ${email} is now an admin.`);
        } else {
            console.log(`User ${email} not found.`);
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

makeAdmin('abhiram@gmail.com');
