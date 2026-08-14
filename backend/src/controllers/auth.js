const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { jwtSecret } = require('../config');

async function register(req, res) {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(409).json({ message: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash, role: role || 'student' });
  res.status(201).json({ id: user.id, username: user.username, email: user.email, role: user.role });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, jwtSecret, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
}

module.exports = { register, login };
