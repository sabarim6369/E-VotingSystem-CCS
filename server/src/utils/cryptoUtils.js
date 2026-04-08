import crypto from 'crypto';
import { env } from '../config/env.js';

const key = crypto.createHash('sha256').update(env.aesSecret).digest();
const algorithm = 'aes-256-cbc';

export const encryptVote = (plainText) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decryptVote = (payload) => {
  const [ivHex, encryptedHex] = payload.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
};

export const buildVoteHash = (voteValue, timestamp) => {
  return crypto.createHash('sha256').update(`${voteValue}:${timestamp.toISOString()}`).digest('hex');
};
