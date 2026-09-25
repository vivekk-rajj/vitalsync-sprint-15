import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const tokenFor = user => jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
const response = user => ({ token: tokenFor(user), user: user.toSafeJSON() });

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '') || !password || password.length < 8) return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Name, valid email, and password of at least 8 characters are required.' } });
    if (await User.findOne({ email: email.toLowerCase().trim() })) return res.status(409).json({ success: false, error: { code: 'EMAIL_EXISTS', message: 'An account already exists for this email.' } });
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({ success: true, ...response(user) });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: (req.body.email || '').toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email or password is incorrect.' } });
    res.json({ success: true, ...response(user) });
  } catch (error) { next(error); }
});
router.get('/me', requireAuth, (req, res) => res.json({ success: true, user: req.user.toSafeJSON() }));
export default router;
