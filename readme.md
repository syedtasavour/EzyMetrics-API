# EzyMetrics API

## Overview

EzyMetrics is a Node.js-based API designed for managing leads and campaigns. It integrates with a MongoDB database to store and retrieve data, provides endpoints for generating reports, and includes email notifications for alerts based on specific conditions. The API also integrates with Salesforce and Mailchimp to manage leads and subscriptions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Leads](#leads)
  - [Campaigns](#campaigns)
  - [Reports](#reports)
  - [Email Notifications](#email-notifications)
  - [Salesforce Integration](#salesforce-integration)
  - [Mailchimp Integration](#mailchimp-integration)
- [Seeding the Database](#seeding-the-database)
- [Contributing](#contributing)
- [License](#license)

## Features

- CRUD operations for leads and campaigns.
- Generate CSV reports of leads.
- Email notifications for alerts when the number of leads exceeds a threshold.
- Integration with MongoDB for data storage.
- Integration with Salesforce for lead management.
- Integration with Mailchimp for email subscriptions.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Nodemailer (for sending emails)
- CSV Writer (for generating CSV reports)
- Axios (for making HTTP requests to Salesforce and Mailchimp)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/syedtasavour/ezyMetrics-API.git
   cd ezyMetrics-API
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/ezyMetrics
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   PORT=3000
   SALESFORCE_CLIENT_ID=your_consumer_key
   SALESFORCE_CLIENT_SECRET=your_consumer_secret
   SALESFORCE_USERNAME=your_salesforce_username
   SALESFORCE_PASSWORD=your_salesforce_password
   SALESFORCE_SECURITY_TOKEN=your_salesforce_security_token
   SALESFORCE_INSTANCE_URL=https://your_instance.salesforce.com
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_SERVER_PREFIX=your_server_prefix
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```

## Environment Variables

- `MONGO_URI`: The connection string for your MongoDB database.
- `EMAIL_USER`: The email address used for sending notifications.
- `EMAIL_PASS`: The password for the email account.
- `PORT`: The port on which the server will run (default is 3000).
- `SALESFORCE_CLIENT_ID`: The Consumer Key from your Salesforce connected app.
- `SALESFORCE_CLIENT_SECRET`: The Consumer Secret from your Salesforce connected app.
- `SALESFORCE_USERNAME`: Your Salesforce username.
- `SALESFORCE_PASSWORD`: Your Salesforce password.
- `SALESFORCE_SECURITY_TOKEN`: Your Salesforce security token.
- `SALESFORCE_INSTANCE_URL`: The URL of your Salesforce instance.
- `MAILCHIMP_API_KEY`: Your Mailchimp API key.
- `MAILCHIMP_SERVER_PREFIX`: The server prefix for your Mailchimp account.

## API Endpoints

### Leads

- **GET /api/leads**
  - Retrieves a list of all leads.
  - **Response**: Array of lead objects.

- **POST /api/leads**
  - Adds a new lead.
  - **Request Body**:
    ```json
    {
      "name": "Lead Name",
      "email": "lead@example.com"
    }
    ```
  - **Response**: The created lead object.

### Campaigns

- **GET /api/campaigns**
  - Retrieves a list of all campaigns.
  - **Response**: Array of campaign objects.

### Reports

- **GET /api/report/csv**
  - Generates a CSV report of all leads.
  - **Response**: Downloads a CSV file.

### Email Notifications

- **POST /api/test-email**
  - Sends a test email notification.
  - **Response**: Confirmation message.

### Salesforce Integration

- **GET /api/salesforce/leads**
  - Fetches leads from Salesforce.
  - **Response**: Array of lead objects from Salesforce.

### Mailchimp Integration

- **POST /api/subscribe**
  - Subscribes an email to a Mailchimp list.
  - **Request Body**:
    ```json
    {
      "email": "subscriber@example.com",
      "listId": "your_list_id"
    }
    ```
  - **Response**: Subscription confirmation.

## Seeding the Database

To populate the database with initial data, run the following command:
