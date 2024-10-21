const nodemailer = require('nodemailer');

// Function to send alert email
const sendAlertEmail = async (alertMessage) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        secure: false, // Use TLS
        port: 587, // Port for STARTTLS
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'recipient@example.com', // Change to the recipient's email
        subject: 'Alert Notification',
        text: alertMessage,
    };

    await transporter.sendMail(mailOptions);
};

// Function to check conditions and send alerts
const checkConditionsAndSendAlerts = async (leads) => {
    if (leads.length > 2) {
        const alertMessage = `Alert: The number of leads has exceeded the threshold. Current count: ${leads.length}`;
        await sendAlertEmail(alertMessage);
    }
};

module.exports = { sendAlertEmail, checkConditionsAndSendAlerts };
