import winston from "winston";
import dotenv from 'dotenv'

dotenv.config();

const rootPath = process.cwd();

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  return isDevelopment ? "debug" : "warn";
};

const transports = [
  new winston.transports.File({
    filename: `${rootPath}/logs/error.log`,
    level: "error",
  }),
  new winston.transports.File({
    filename: `${rootPath}/logs/combined.log`,
  }),
  new winston.transports.Console(),
];

const format = winston.format.combine(
  winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),

  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level} : ${info.message}`
  )
);

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exitOnError: false,
});

export default logger;
