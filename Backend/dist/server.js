"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const envConfig_1 = require("./config/envConfig");
const logger_1 = require("./config/logger");
async function startServer() {
    try {
        // Initialize database
        logger_1.log.info("Initializing database...");
        await db_1.default.$connect();
        logger_1.log.info("Database initialized successfully");
        // Start server
        const server = app_1.default.listen(envConfig_1.config.server.port, () => {
            logger_1.log.info(`Server is running on port ${envConfig_1.config.server.port}`);
        });
        // Graceful shutdown
        const shutdown = async () => {
            logger_1.log.info("Shutting down server...");
            server.close(() => {
                logger_1.log.info("Server closed");
                process.exit(0);
            });
        };
        process.on("SIGTERM", shutdown);
        process.on("SIGINT", shutdown);
    }
    catch (error) {
        logger_1.log.error("Failed to start server", { error });
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map