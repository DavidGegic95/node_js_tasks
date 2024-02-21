import { ProductModel } from "../models/product.model";
import { Response } from "express";

const getAllProducts = async (res: Response) => {
  try {
    const products = await ProductModel.find();
    return {
      status: "success",
      data: { products },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getProductbyId = async (productId: string) => {
  try {
    const id = productId;
    const product: any = await ProductModel.findOne({ id });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const productService = {
  getAll: getAllProducts,
  getById: getProductbyId,
};
