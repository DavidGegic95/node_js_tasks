import router from "./controllers/product.controller";
import cartRouter from "./controllers/cart.controller";
const express = require("express");
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(router);
app.use(cartRouter);

app.listen(PORT, () => {
  console.log(`Server is started http://localhost:${PORT}`);
});
