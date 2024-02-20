import { Product } from "../entity/Product";
import { Response } from "express";
import { AppDataSource } from "../data-source";

const getAllProducts = async (res: Response) => {
  try {
    const dataSource = AppDataSource.manager;
    const productRepository = dataSource.getRepository(Product);
    const products = await productRepository.find();
    return {
      status: "success",
      data: { products },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getProductById = async (productId: string) => {
  try {
    const dataSource = AppDataSource.manager;
    const productRepository = dataSource.getRepository(Product);
    const product = await productRepository.findOne({
      where: { id: productId },
    });
    return {
      status: "success",
      data: { product },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const productService = {
  getAll: getAllProducts,
  getById: getProductById,
};
