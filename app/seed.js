const mongoose = require('mongoose');
const { Lead, Campaign } = require('./models');
const connectDB = require('./database');
const { createLead } = require('./salesforce');

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

const seedDummyData = async () => {
    const dummyLead = {
        LastName: 'eddfdds',
        FirstName: 'sddsd',
        Email: 'john.sdd@ssdds.com',
        Company: 'sddssdds',
    };

    try {
        const createdLead = await createLead(dummyLead);
        console.log('Lead created successfully:', createdLead);
    } catch (error) {
        console.error('Error seeding dummy data:', error.message);
    }
};

seedDummyData();
