const logModel = require('../model/log');

async function logMiddleware(req, res, next) {
  const startTime = new Date();
  let responseData;

  // Capture response details after the request is handled
  const originalSend = res.send;
  res.send = function (body) {
    responseData = body;
    originalSend.call(this, body);
  };

  res.on('finish', async () => {
    const endTime = new Date();
    const responseTime = endTime - startTime;

    const logEntry = {
      requestInfo:{method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      query: req.query,
      body: req.body,
      timestamp: startTime,},

      responseInfo: {
        status: res.statusCode,
        headers: res.getHeaders(),
        body: responseData,
        time: responseTime,
      },
    };
  
    try {
      await logModel.create(logEntry); // Use create to save the log entry to the database
    } catch (error) {
      // Handle any potential error while saving to the database
      console.error('Error saving log entry:', error);
    }
  });

  next();
}

module.exports = { logMiddleware };
