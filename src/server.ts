import cartRouter from "./controllers/cart.controller";
import { authMiddleware } from "./authMiddleware/authMiddleware";
import productRouter from "./controllers/product.controller";
import express from "express";
import mongoose from "mongoose";

const PORT = 8000;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/my-mongodb", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("Error connecting to MongoDB", err));

app.use(express.json());
app.use(authMiddleware);
app.use(productRouter);
app.use(cartRouter);

app.listen(PORT, () => {
  console.log(`Server is started http://localhost:${PORT}`);
});
