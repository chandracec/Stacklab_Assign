const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('../src/routes/route');
const { logMiddleware } = require('../src/middleware/logMiddleware');
const { specs, swaggerUi } = require('../src/config/swagger');
const connectToMongoDB = require('../src/config/mongodb');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Helmet middleware for securing HTTP headers
app.use(helmet());

// Custom log middleware to capture and log request details
app.use(logMiddleware);

// Connect to MongoDB
connectToMongoDB()

// Routes middleware
app.use('/', router);

// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
