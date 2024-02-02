import express, { Request, Response } from "express";
import { Router } from "express";
import { cartService } from "../services/cart.service";

const cartRouter = Router();

cartRouter.get("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const cart = await cartService.getCart();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default cartRouter;
