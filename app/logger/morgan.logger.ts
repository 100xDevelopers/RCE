import morgan from "morgan";
import logger from "./winston.logger";

const stream = {
  // Use the http severity
  write: (message: string) => logger.http(message.trim()),
};

const skip = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  return isDevelopment;
};

const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream }
);

export default morganMiddleware;
