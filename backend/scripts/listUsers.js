import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
        const users = await User.find({}, 'name email isAdmin');
        console.log('--- USERS IN DATABASE ---');
        console.log(JSON.stringify(users, null, 2));
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

listUsers();
