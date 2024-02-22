import cartRouter from "./controllers/cart.controller";
import userRouter from "./controllers/user.controller";
import productRouter from "./controllers/product.controller";
import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "./authMiddleware/authentication.middleware";

const PORT = 8000;
const app = express();

mongoose
  .connect("mongodb://localhost:27017", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("Error connecting to MongoDB", err));

app.use(express.json());
app.use(userRouter);
app.use(authMiddleware, productRouter);
app.use(authMiddleware, cartRouter);

app.listen(PORT, () => {
  console.log(`Server is started http://localhost:${PORT}`);
});
