const mongoose = require('mongoose');
require('dotenv').config(); 

console.log('MongoDB URI:', process.env.MONGO_URI);
const DB_URL = process.env.MONGO_URI; // Moved outside the try block

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
