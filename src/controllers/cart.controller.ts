import express, { Request, Response } from "express";
import { Router } from "express";
import { isAdmin } from "../authMiddleware/authorization.middleware";
import { cartService } from "../services/cart.service";
import { validateRequestBody } from "../utils/heplers/joiValidator";

const cartRouter = Router();

cartRouter.get("/api/profile/cart", async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
    await cartService.getCart(userId, res);

});

cartRouter.delete(
  "/api/profile/cart",
  isAdmin,
  async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    await cartService.deleteById(userId, res);
  }
);

cartRouter.put(
  "/api/profile/cart",
  validateRequestBody,
  async (req: Request, res: Response) => {
    const productInfo = req.body;
    const userId = req.headers["x-user-id"] as string;
    await cartService.updateCart(userId, productInfo, res);
  }
);
cartRouter.post(
  "/api/profile/cart/checkout",
  async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    await cartService.cartCheckout(userId, res, req.body);
  }
);

export default cartRouter;
