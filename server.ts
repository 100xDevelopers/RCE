import { createServer } from "http";
import app from "./app";
import logger from "./app/logger/winston.logger";
import dotenv from 'dotenv'

dotenv.config();

const initiateServer = async () => {
  const httpServer = createServer(app);

  const PORT = process.env.APP_PORT;

  httpServer.listen(PORT, () => {
    logger.info(`🚀🔥 Server is running on http://localhost:${PORT} 🔥🚀`);
  });
};

(async () => {
  try {
    await initiateServer();
  } catch (error) {
    logger.error("An error occurred while starting the server:", error);
    process.exit(1);
  }
})();
