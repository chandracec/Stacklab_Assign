// Import the log model
const logModel = require('../model/log');

// Middleware to log incoming requests and responses
async function logMiddleware(req, res, next) {
  // Record the start time of the request
  const startTime = new Date();
  let responseData;

  // Capture response details after the request is handled
  const originalSend = res.send;
  res.send = function (body) {
    responseData = body;
    originalSend.call(this, body);
  };

  // Listen for the 'finish' event, which is emitted when the response has been sent
  res.on('finish', async () => {
    // Record the end time of the request
    const endTime = new Date();
    // Calculate the response time
    const responseTime = endTime - startTime;

    // Create a log entry with request and response information
    const logEntry = {
      requestInfo: {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        query: req.query,
        body: req.body,
        timestamp: startTime,
      },
      responseInfo: {
        status: res.statusCode,
        headers: res.getHeaders(),
        body: responseData,
        time: responseTime,
      },
    };

    try {
      // Save the log entry to the database
      await logModel.create(logEntry);
      console.log("Created log")
    } catch (error) {
      // Handle any potential error while saving to the database
      console.error('Error saving log entry:', error);
    }
  });

  // Continue to the next middleware or route handler
  next();
}

// Export the logMiddleware function
module.exports = { logMiddleware };
