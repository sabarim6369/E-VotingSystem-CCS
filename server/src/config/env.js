import dotenv from 'dotenv';

dotenv.config();

const required = ['MONGODB_URI', 'JWT_SECRET', 'AES_SECRET'];

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  aesSecret: process.env.AES_SECRET,
  adminEmail: process.env.ADMIN_EMAIL || 'admin@securevote.local',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@123',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
};
