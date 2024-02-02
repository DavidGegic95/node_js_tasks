import { productRepository } from "../repositories/product.repository";

const getAllProducts = async (): Promise<Array<any>> => {
  const products = await productRepository.getAll();
  return products;
};

const getProductbyId = async (productId: string) => {
  const product = await productRepository.getById(productId);
  return product;
};

export const productService = {
  getAll: getAllProducts,
  getById: getProductbyId,
};
