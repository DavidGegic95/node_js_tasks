import express, { Request, Response } from "express";
import { Router } from "express";
import { cartService } from "../services/cart.service";
import { validateRequestBody } from "../utils/heplers/joiValidator";

const cartRouter = Router();

cartRouter.get("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const cart = await cartService.getCart(headers);
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartRouter.delete("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const body = await cartService.deleteById(headers);
    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartRouter.put(
  "/api/profile/cart",
  validateRequestBody,
  async (req: Request, res: Response) => {
    try {
      const productInfo = req.body;
      const headers = req.headers;
      const response = await cartService.updateCart(productInfo, headers);
      res.status(response.status).json(response.body);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
cartRouter.post(
  "/api/profile/cart/checkout",
  async (req: Request, res: Response) => {
    try {
      const headers = req.headers;
      const body = await cartService.cartCheckout(headers);

      res.status(200).json(body);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default cartRouter;
