const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check Authorization header (Bearer token)
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Fallback: HTTP-only cookie
  else if (req.cookies?.devopsbuddy_token) {
    token = req.cookies.devopsbuddy_token;
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-__v');

    if (!user) return res.status(401).json({ error: 'User no longer exists.' });
    if (!user.isActive) return res.status(403).json({ error: 'Account deactivated.' });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token.' });
    if (error.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired. Please log in again.' });
    return res.status(500).json({ error: 'Authentication error.' });
  }
};

module.exports = protect;
