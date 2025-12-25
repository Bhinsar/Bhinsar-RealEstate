import app from './app';
import prisma from './config/db';
import { config } from './config/envConfig';
import { log } from './config/logger';

async function startServer() {
  try {
    // Initialize database
    log.info('Initializing database...');
    await prisma.$connect();
    log.info('Database initialized successfully');

    // Start server
    const server = app.listen(config.server.port, () => {
      log.info(`Server is running on port ${config.server.port}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      log.info('Shutting down server...');
      
      server.close(() => {
        log.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    log.error('Failed to start server', { error });
    process.exit(1);
  }
}

startServer();