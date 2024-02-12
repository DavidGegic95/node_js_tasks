import express, { Request, Response } from "express";
import { productService } from "../services/product.service";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRouter.get(
  "/api/products/:productId",
  async (req: Request, res: Response) => {
    try {
      const productId = req.params.productId;
      const product = await productService.getById(productId);

      if (!product) {
        return res.status(404).json({
          data: null,
          error: {
            message: "No product with such id",
          },
        });
      }
      res.status(200).json({
        data: product,
        error: null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default productRouter;
