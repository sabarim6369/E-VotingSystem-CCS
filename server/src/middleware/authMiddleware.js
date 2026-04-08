import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authenticateUser = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }
};

export const authenticateAdmin = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.admin = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }
};
