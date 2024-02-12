import cartRouter from "./controllers/cart.controller";
import { authMiddleware } from "./authMiddleware/authMiddleware";
import productRouter from "./controllers/product.controller";
const express = require("express");
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(authMiddleware);
app.use(productRouter);
app.use(cartRouter);

app.listen(PORT, () => {
  console.log(`Server is started http://localhost:${PORT}`);
});
