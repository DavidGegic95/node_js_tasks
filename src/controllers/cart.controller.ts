import express, { Request, Response } from "express";
import { Router } from "express";
import { cartService } from "../services/cart.service";

const cartRouter = Router();

cartRouter.get("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const userid = req.headers.userid;
    if (typeof userid === "string" && userid.length > 0) {
      const cart = await cartService.getCart(userid);
      res.status(200).json(cart);
    } else {
      res.status(403).json({
        data: null,
        error: {
          message: "You must be authorized user",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartRouter.delete("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const body = await cartService.deleteById(userId);
    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartRouter.put("/api/profile/cart", async (req: Request, res: Response) => {
  try {
    const productInfo = req.body;
    const headers = req.headers;
    const body = await cartService.updateCart(productInfo, headers);

    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
cartRouter.post(
  "/api/profile/cart/checkout",
  async (req: Request, res: Response) => {
    try {
      // const productInfo = req.body;
      // const headers = req.headers;
      // const body = await cartService.updateCart(productInfo, headers);

      res.status(200).json({ succesful: "yes" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default cartRouter;