const jwt = require('jsonwebtoken');

// Secret key for JWT - in production, this should be in environment variables
const JWT_SECRET = 'heroes_jwt_secret_Key_2023';

// Generate token for user
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      nombre: user.nombre,
      username: user.username
    }, 
    JWT_SECRET, 
    { expiresIn: '30d' }
  );
};

// Verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  JWT_SECRET
};
