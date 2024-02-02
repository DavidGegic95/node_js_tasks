import * as fs from "fs";
import * as path from "path";
import { CartType } from "../utils/types/cart.type";

const cartFilePath = path.join(__dirname, "../models/data/cart.json");

const getCart = async () => {
  const cart = await getCartFromFile();
  return cart;
};

const createCart = async (cartData: CartType) => {
  const cart = await createCartToFile(cartData);
  return cart;
};

const createCartToFile = async (cartData: CartType) => {
  try {
    fs.writeFile(cartFilePath, JSON.stringify(cartData), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    return null;
  }
};

const getCartFromFile = async () => {
  try {
    const data = await fs.promises.readFile(cartFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const cartRepository = {
  getCart: getCart,
  createCart: createCart,
};
