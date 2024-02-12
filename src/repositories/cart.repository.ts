import * as fs from "fs";
import * as path from "path";
import { cartUpdateBody } from "../utils/heplers/cartUpdateBody";
import {
  invalidCartResponse,
  invalidProductReponse,
} from "../utils/responseMessages/responses";
import { CartType } from "../utils/types/cart.type";
import { ProductType } from "../utils/types/product.type";

const cartFilePath = path.join(__dirname, "../models/data/cart.json");
const productFilePath = path.join(__dirname, "../models/data/products.json");

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
  const allCarts = await getCartsFromFile();
  allCarts.push(cartData);
  writeDataToFile(allCarts);
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
const updateCart = async (productInfo: any, headers: any) => {
  const userId = headers["x-user-id"];
  const { productId, count } = productInfo;

  const allCarts = await getCartsFromFile();
  let cartIndex = allCarts.findIndex((cart: CartType) => cart.id === userId);
  if (cartIndex === -1) return invalidCartResponse;

  const allProducts = await getProductsFromFile();
  let productIndexinProducts = allProducts.findIndex(
    (product: ProductType) => product.id === productId
  );
  if (productIndexinProducts === -1) return invalidProductReponse;

  const productIndex = allCarts[cartIndex].items.findIndex(
    (p: any) => p.product.id === productId
  );
  if (productIndex !== -1) {
    allCarts[cartIndex].items.splice(productIndex, 1, {
      product: allProducts[productIndexinProducts],
      count: count,
    });
    await writeDataToFile(allCarts);
  } else {
    allCarts[cartIndex].items.push({
      product: allProducts[productIndexinProducts],
      count: count,
    });
    await writeDataToFile(allCarts);
    return allCarts[cartIndex];
  }

  return { status: 200, body: cartUpdateBody(allCarts[cartIndex]) };
};

const writeDataToFile = async (cartData: CartType[]) => {
  try {
    fs.writeFile(cartFilePath, JSON.stringify(cartData), (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {
    return null;
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

const getProductsFromFile = async () => {
  try {
    const data = await fs.promises.readFile(productFilePath, "utf-8");
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
