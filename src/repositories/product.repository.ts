import * as fs from "fs";
import * as path from "path";
import { ProductType } from "../utils/types/product.type";

const productsFilePath = path.join(__dirname, "../models/data/products.json");

const getAllProducts = async () => {
  const products = await getAllProductsFromFile();
  return products;
};

const getProductById = async (productId: string) => {
  const products = await getAllProductsFromFile();

  const product = products.find(
    (product: ProductType) => product.id === productId
  );
  return product ? product : null;
};

const getAllProductsFromFile = async () => {
  try {
    const data = await fs.promises.readFile(productsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const productRepository = {
  getAll: getAllProducts,
  getById: getProductById,
};
