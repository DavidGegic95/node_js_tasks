import { count } from "console";
import * as fs from "fs";
import * as path from "path";
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
const updateCart = async (productInfo: any, headers: any) => {
  const userId = headers?.userid;
  const { productId, count } = productInfo;
  const allCarts = await getCartsFromFile();
  let cartIndex = allCarts.findIndex((cart: CartType) => cart.id === userId);
  const allProducts = await getProductsFromFile();
  let productIndex = allProducts.findIndex(
    (product: ProductType) => product.id === productId
  );
  // console.log(productIndex);
  // console.log(cartIndex);
  // console.log(allCarts);

  if (cartIndex !== -1 && allCarts[cartIndex].items.length !== 0) {
    const productIndex = allCarts[cartIndex].items.findIndex(
      (p: any) => p.product.id === productId
    );
    if (productIndex !== -1) {
      allCarts[cartIndex].items.push({
        products: allProducts[productIndex],
        count: 999,
      });
    }
    // console.log(allCarts[0]);
    console.log(allCarts[cartIndex].items);
  }
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
