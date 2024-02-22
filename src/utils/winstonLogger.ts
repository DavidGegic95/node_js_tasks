import winston from "winston";
import * as expressWinston from "express-winston";
import { format } from "date-fns";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf(
      (info) =>
        `[${format(
          new Date(info.timestamp),
          "EEE, dd MMM yyyy HH:mm:ss"
        )}] ${info.level.toUpperCase()} ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export const winstonLoggerMiddleware = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf(
      (info) =>
        `[${format(
          new Date(info.timestamp),
          "EEE, dd MMM yyyy HH:mm:ss"
        )}] ${info.level.toUpperCase()} ${info.message}`
    )
  ),
});
