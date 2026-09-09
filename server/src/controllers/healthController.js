import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getHealthStatus = asyncHandler(async (req, res) => {
  const dbStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbState = mongoose.connection.readyState;

  res.status(200).json({
    success: true,
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStateMap[dbState] || 'unknown',
      host: mongoose.connection.host || 'none',
    },
    timestamp: new Date().toISOString(),
  });
});
