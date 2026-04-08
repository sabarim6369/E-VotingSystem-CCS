import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import electionRoutes from './routes/electionRoutes.js';
import { env } from './config/env.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  return res.status(200).json({ message: 'Server healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api', electionRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
