const mongoose = require('mongoose');
const { Lead, Campaign } = require('./models');
const connectDB = require('./database');

const seedDatabase = async () => {
    await connectDB();

    // Clear existing data
    await Lead.deleteMany({});
    await Campaign.deleteMany({});

    // Create dummy leads
    const leads = [
        { name: 'Lead 1', email: 'lead1@example.com' },
        { name: 'Lead 2', email: 'lead2@example.com' },
    ];

    // Create dummy campaigns
    const campaigns = [
        { title: 'Campaign 1', status: 'active' },
        { title: 'Campaign 2', status: 'inactive' },
    ];

    await Lead.insertMany(leads);
    await Campaign.insertMany(campaigns);

    console.log('Database seeded!');
    mongoose.connection.close();
};

seedDatabase().catch(err => {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
});