import { Request, Response } from "express";
import { Router } from "express";
import { cartService } from "../services/cart.service";

const cartRouter = Router();

cartRouter.get("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    await cartService.getCart(userId, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartRouter.delete("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    await cartService.deleteById(userId, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartRouter.put("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const productInfo = req.body;
    const userId = req.headers["x-user-id"] as string;
    await cartService.updateCart(userId, productInfo, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


cartRouter.post(
  "/api/profile/cart/checkout",
  async (req: Request, res: Response, body: any) => {
    try {
      const userId = req.headers["x-user-id"] as string;
      await cartService.cartCheckout(userId, res, req.body);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default cartRouter;
