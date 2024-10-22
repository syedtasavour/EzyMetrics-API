const axios = require('axios');
require('dotenv').config();

const SALESFORCE_URL = process.env.SALESFORCE_URL; // Use the URL from .env

const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', process.env.SALESFORCE_CLIENT_ID);
    params.append('client_secret', process.env.SALESFORCE_CLIENT_SECRET);
    params.append('username', process.env.SALESFORCE_USERNAME);
    params.append('password', process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN);

    try {
        const response = await axios.post(SALESFORCE_URL, params);
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting Salesforce access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get access token');
    }
};

const fetchLeads = async () => {
    const accessToken = await getAccessToken();
    const instanceUrl = process.env.SALESFORCE_INSTANCE_URL; // Use the instance URL from .env

    try {
        const response = await axios.get(`${instanceUrl}/services/data/v58.0/sobjects/Lead/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.records;
    } catch (error) {
        console.error('Error fetching leads from Salesforce:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch leads');
    }
};

// New function to create a lead
const createLead = async (leadData) => {
    const accessToken = await getAccessToken();
    const instanceUrl = process.env.SALESFORCE_INSTANCE_URL; // Use the instance URL from .env

    try {
        const response = await axios.post(`${instanceUrl}/services/data/v58.0/sobjects/Lead/`, leadData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the created lead data
    } catch (error) {
        console.error('Error creating lead in Salesforce:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create lead');
    }
};

module.exports = { fetchLeads, createLead };
