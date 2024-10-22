require('dotenv').config(); // Load environment variables from .env file

// Log environment variables for debugging
console.log('Salesforce Client ID:', process.env.SALESFORCE_CLIENT_ID);
console.log('Salesforce Client Secret:', process.env.SALESFORCE_CLIENT_SECRET);
console.log('Salesforce Username:', process.env.SALESFORCE_USERNAME);

const express = require('express');
const { createObjectCsvWriter } = require('csv-writer');
const { transformData } = require('./etl'); // Assuming you have this function defined
const { checkConditionsAndSendAlerts, sendAlertEmail } = require('./alerts'); // Import the alert function
const { Lead, Campaign } = require('./models'); // Import the models
const { fetchLeads } = require('./salesforce'); // Import the Salesforce integration
const { addSubscriber } = require('./marketing'); // Import the Mailchimp integration
const app = express();
const PORT = process.env.PORT || 3000; // This will now use 27017 if set in .env

app.use(express.json()); // Middleware to parse JSON bodies

// Endpoint to fetch leads
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find(); // Retrieve leads from the database
        res.json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error); // Log the error
        res.status(500).send('Error fetching leads: ' + error.message);
    }
});

// Endpoint to add a new lead
app.post('/api/leads', async (req, res) => {
    const { name, email } = req.body;
    const newLead = new Lead({ name, email });

    try {
        await newLead.save(); // Save the new lead to the database
        await checkConditionsAndSendAlerts(await Lead.find()); // Check conditions after adding a lead
        res.status(201).json(newLead);
    } catch (error) {
        res.status(400).send('Error adding lead: ' + error.message);
    }
});

// Endpoint to fetch campaigns
app.get('/api/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find(); // Retrieve campaigns from the database
        res.json(campaigns);
    } catch (error) {
        res.status(500).send('Error fetching campaigns: ' + error.message);
    }
});

// Endpoint to generate CSV report
app.get('/api/report/csv', async (req, res) => {
    const transformedData = transformData(await Lead.find()); // Transform the leads data
    const csvWriter = createObjectCsvWriter({
        path: 'report.csv',
        header: [
            { id: 'id', title: 'ID' },
            { id: 'name', title: 'NAME' },
        ],
    });

    await csvWriter.writeRecords(transformedData);
    res.download('report.csv');
});

// Test endpoint to send a test email
app.post('/api/test-email', async (req, res) => {
    try {
        await sendAlertEmail('This is a test alert email.');
        res.status(200).send('Test email sent successfully.');
    } catch (error) {
        res.status(500).send('Error sending test email: ' + error.message);
    }
});

// New endpoint to fetch leads from Salesforce
app.get('/api/salesforce/leads', async (req, res) => {
    try {
        const leads = await fetchLeads();
        res.json(leads);
    } catch (error) {
        res.status(500).send('Error fetching leads from Salesforce: ' + error.message);
    }
});

// Endpoint to subscribe to a Mailchimp list
app.post('/api/subscribe', async (req, res) => {
    const { email, listId } = req.body;
    try {
        const response = await addSubscriber(listId, email);
        res.status(200).json({ message: 'Subscription successful', data: response });
    } catch (error) {
        res.status(500).json({ message: 'Subscription failed', error: error.message });
    }
});

// Export the app for testing
module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
