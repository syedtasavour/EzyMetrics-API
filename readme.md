# EzyMetrics API

## Overview

EzyMetrics is a Node.js-based API designed for managing leads and campaigns. It integrates with a MongoDB database to store and retrieve data, provides endpoints for generating reports, and includes email notifications for alerts based on specific conditions.

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
- [Seeding the Database](#seeding-the-database)
- [Contributing](#contributing)
- [License](#license)

## Features

- CRUD operations for leads and campaigns.
- Generate CSV reports of leads.
- Email notifications for alerts when the number of leads exceeds a threshold.
- Integration with MongoDB for data storage.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Nodemailer (for sending emails)
- CSV Writer (for generating CSV reports)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/syedtasavour/ezyMetrics.git
   cd ezyMetrics
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

## Seeding the Database

To populate the database with initial data, run the following command:

```bash
node app/seed.js
```

This will create dummy leads and campaigns in your MongoDB database.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
