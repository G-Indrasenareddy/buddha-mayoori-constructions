import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/buddha_mayoori_db';

  try {
    const conn = await mongoose.connect(connUri, {
      autoIndex: process.env.NODE_ENV !== 'production',
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    // In production/dev, exit on startup failure if DB is strictly required
    if (process.env.STRICT_DB_REQUIRED === 'true') {
      process.exit(1);
    }
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('Mongoose default connection disconnected.');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose connection error: ${err.message}`);
  });

  // Graceful termination
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    logger.info('Mongoose default connection closed through app termination (SIGINT).');
    process.exit(0);
  });
};
