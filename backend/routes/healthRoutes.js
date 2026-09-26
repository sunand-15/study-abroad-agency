import express from 'express';

const router = express.Router();

/**
 * GET /api/health
 * Simple health check to verify server is running.
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Study Abroad API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;