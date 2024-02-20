import "reflect-metadata";
import { DataSource } from "typeorm";
import { CartItem } from "./entity/Cart";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";
import { User } from "./entity/User";
import { Cart } from "./entity/Cart";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, Cart, CartItem, Product, Order],
  migrations: [],
  subscribers: [],
});
