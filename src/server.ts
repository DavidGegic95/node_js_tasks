import cartRouter from "./controllers/cart.controller";
import userRouter from "./controllers/user.controller";
import productRouter from "./controllers/product.controller";
import { healthRouter } from "./controllers/health.controller";
import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "./authMiddleware/authentication.middleware";
import { gracefulShutdown } from "./utils/gracefulShutdown";
import { logger } from "./utils/winstonLogger";
import { winstonLoggerMiddleware } from "./utils/winstonLogger";

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "0.0.0.0";
const app = express();

mongoose
  .connect(`mongodb://${DB_HOST}:27017`, {})
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err: any) => logger.info("Error connecting to MongoDB", err));

app.use(express.json());
app.use(userRouter);
app.use(healthRouter);
app.use(authMiddleware, productRouter);
app.use(authMiddleware, cartRouter);
app.use(winstonLoggerMiddleware);

const server = app.listen(PORT, () => {
  logger.info(`Server is started http://localhost:${PORT}`);
});

gracefulShutdown(server);
