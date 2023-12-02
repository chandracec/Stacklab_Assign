const mongoose = require('mongoose');
require('dotenv').config();

/**
 * connectToMongoDB
 * Connects to MongoDB using the provided URI.
 * Throws an error if the connection to MongoDB fails.
 */
const connectToMongoDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');
  } catch (err) {
    // Log and rethrow the error if the connection fails
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

module.exports = connectToMongoDB;
