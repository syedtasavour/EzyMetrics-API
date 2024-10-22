const mailchimp = require('@mailchimp/mailchimp_marketing');

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1'
});

// Function to add a subscriber to a list
const addSubscriber = async (listId, email) => {
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    });
    console.log(`Successfully added subscriber: ${response.id}`);
    return response;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw new Error('Failed to add subscriber');
  }
};

module.exports = { addSubscriber };
