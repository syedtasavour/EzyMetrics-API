const mongoose = require('mongoose');

// Define the Lead schema
const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// Define the Campaign schema
const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
});

// Create models
const Lead = mongoose.model('Lead', leadSchema);
const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = { Lead, Campaign };
