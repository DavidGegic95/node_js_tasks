// import cartRouter from "./controllers/cart.controller";
// import { authMiddleware } from "./authMiddleware/authMiddleware";
// import productRouter from "./controllers/product.controller";
// import express from "express";
// import { createConnection } from "typeorm";

// const PORT = 8000;
// const app = express();

// createConnection()
//   .then(async (connection) => {
//     app.listen(PORT);
//     console.log(`Express server has started on port ${PORT}.`);
//   })
//   .catch((error) => console.log(error));

// app.use(express.json());
// app.use(authMiddleware);
// app.use(productRouter);
// app.use(cartRouter);

// app.listen(PORT, () => {
//   console.log(`Server is started http://localhost:${PORT}`);
// });
