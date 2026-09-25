import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Authentication is required.' } });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ success: false, error: { code: 'INVALID_SESSION', message: 'User session is no longer valid.' } });
    req.user = user;
    next();
  } catch { return res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token.' } }); }
}
