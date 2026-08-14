const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Bad auth format' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function roleGuard(roles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No user' });
    if (!roles.length || roles.includes(req.user.role)) return next();
    return res.status(403).json({ message: 'Forbidden' });
  };
}

module.exports = { authMiddleware, roleGuard };
