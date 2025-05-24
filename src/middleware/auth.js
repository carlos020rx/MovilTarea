const { verifyToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  const token = authHeader.split(' ')[1];
  
  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
  
  // If valid token, add user to request object
  req.user = decoded;
  next();
};

module.exports = authenticate;
