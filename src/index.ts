import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { authMiddleware } from "./authMiddleware/authMiddleware";
import productRouter from "./controllers/product.controller";
import cartRouter from "./controllers/cart.controller";
import { Product } from "./entity/Product";
import { v4 } from "uuid";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(authMiddleware);
    app.use(productRouter);
    app.use(cartRouter);

    // register express routes from defined application routes

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // // insert new users for test
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(Product, {
    //     _id: v4(),
    //     title: "Satechi x1",
    //     description:
    //       "All the features you love in our most compact keyboard yet. Upgrade your on-the-go setup with the Satechi Slim X1 Bluetooth Backlit Keyboard. Designed with Apple users in mind, the keyboard features a full QWERTY layout, multi-device Bluetooth connection, and macOS function keys  all with a smaller, more compact size.",
    //     price: 70,
    //   })
    // );

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24,
    //   })
    // );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000"
    );
  })
  .catch((error) => console.log(error));
