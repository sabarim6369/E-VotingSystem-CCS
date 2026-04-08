import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

const makeUserToken = (user) => {
  return jwt.sign(
    { id: user._id, aadhaarId: user.aadhaarId, name: user.name, role: 'user' },
    env.jwtSecret,
    { expiresIn: '1d' }
  );
};

export const register = async (req, res, next) => {
  try {
    const { name, aadhaarId, password } = req.body;

    if (!name || !aadhaarId || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/^\d{12}$/.test(aadhaarId)) {
      return res.status(400).json({ message: 'Aadhaar-like ID must be 12 digits' });
    }

    const exists = await User.findOne({ aadhaarId });
    if (exists) {
      return res.status(409).json({ message: 'Aadhaar-like ID already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, aadhaarId, passwordHash, votedElections: [] });

    return res.status(201).json({
      token: makeUserToken(user),
      user: { id: user._id, name: user.name, aadhaarId: user.aadhaarId }
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { aadhaarId, password } = req.body;

    if (!aadhaarId || !password) {
      return res.status(400).json({ message: 'Aadhaar-like ID and password are required' });
    }

    const user = await User.findOne({ aadhaarId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({
      token: makeUserToken(user),
      user: { id: user._id, name: user.name, aadhaarId: user.aadhaarId }
    });
  } catch (error) {
    return next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email !== env.adminEmail || password !== env.adminPassword) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign({ role: 'admin', email }, env.jwtSecret, { expiresIn: '1d' });
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};
