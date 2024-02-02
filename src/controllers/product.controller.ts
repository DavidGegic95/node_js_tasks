import express, { Request, Response } from "express";
import * as Joi from "joi";
import { productService } from "../services/product.service";
import { Router } from "express";

const router = Router();

router.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/products/:productId", async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
