const jwt = require('jsonwebtoken');
require('dotenv').config();


// function to generate jwt token
function generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
  }



// Middleware to check JWT for authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
};

module.exports = {authenticateJWT,generateToken};
