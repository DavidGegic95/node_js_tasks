import * as fs from "fs";
import * as path from "path";
import { CartType } from "../utils/types/cart.type";

const cartFilePath = path.join(__dirname, "../models/data/cart.json");

const getCart = async (userId: string) => {
  const allCarts = await getCartsFromFile();
  if (allCarts && allCarts.length !== 0) {
    let index = allCarts.findIndex((cart: CartType) => cart.id === userId);
    if (index === -1) return null;
    return allCarts[index];
  } else {
    return null;
  }
};

const createCart = async (cartData: CartType) => {
  const cart = await writeDataToFile([cartData]);
  return cartData;
};

const deleteById = async (cartId: string) => {
  const allCarts = await getCartsFromFile();
  if (allCarts.length === 0) return false;
  let cartIndex = allCarts.findIndex((cart: CartType) => cart.id === cartId);
  if (cartIndex === -1) {
    return false;
  } else {
    allCarts.splice(cartIndex, 1);
    await writeDataToFile(allCarts);
    return true;
  }
};
const updateCart = async (productInfo: any) => {};

const writeDataToFile = async (cartData: CartType[]) => {
  try {
    fs.writeFile(cartFilePath, JSON.stringify(cartData), (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getCartsFromFile = async () => {
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
  deleteById: deleteById,
  updateCart: updateCart,
};
