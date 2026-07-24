import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import { logger } from './config/logger';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`🚀 DreamVerse AI Server listening on http://localhost:${PORT}`);
    logger.info(`📚 Swagger API Documentation available at http://localhost:${PORT}/api-docs`);
  });
};

startServer();
