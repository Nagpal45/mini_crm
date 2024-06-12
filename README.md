# Mini CRM

## Introduction

Consists of two main folders: frontend and backend. The installation and setup process for both is as follows:

## How to Start the App

### Frontend

To run the frontend, follow these steps:

1. Install node modules:
   ```bash
   npm i
   ```
2. Start the frontend:
   ```bash
   npm start
   ```

### Backend

To run the backend, follow these steps:

1. Install node modules:
   ```bash
   npm i
   ```
2. Setup the Environment variables
    ```bash
   MONGO = your_mongodb_connection_url

   RABBITMQ_URL = amqp://localhost/  (Install RabbitMq on system or Run RabbitMq docker image using docker hub) 

   GOOGLE_CLIENT_ID = your_google_client_id
   GOOGLE_CLIENT_SECRET = your_google_client_secret

   (Get these google credentials by creating oauth credentials from google cloud console)
   ```

4. Start the server:
   ```bash
   node index.js
   ```

## Usage
Once both the frontend and backend are running, you can access the CRM system through your browser at http://localhost:3000/
