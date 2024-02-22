import { Response } from "express";
import { ICart, CartModel } from "../models/cart.model";
import { getTotalPrice } from "../utils/heplers/getTotal";

const getCart = async (userId: string, res: Response) => {
  try {
    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "User id is required",
      });
    }
    
    let cart: ICart | null;

    cart = await CartModel.findOne({ userId });
    if (!cart) {
      const newCart = new CartModel({
        userId: userId,
        isDeleted: false,
        items: [],
      });

      await newCart.save();

      res.status(201).json({
        status: "created",
        data: { cart: newCart },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { cart },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const deleteById = async (userId: string, res: Response) => {
  try {
    const emptyCart = await CartModel.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );

    if (emptyCart) {
      res.status(200).json({
        status: "success",
        message: "User cart emptied",
        data: { emptyCart },
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User cart not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const updateCart = async (userId: string, updatedItems: any, res: Response) => {
  try {
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId },
      { items: updatedItems },
      { new: true }
    );
    if (updatedCart) {
      res.status(200).json({
        status: "success",
        message: "User cart updated",
        data: { updatedCart },
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User cart not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const cartCheckout = async (userId: string, res: Response, body: any) => {
  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart || cart.isDeleted) {
      return res.status(404).send("Cart not found");
    }
    const totalPrice = await getTotalPrice(cart);
    const order = {
      userId,
      items: cart.items,
      payment: body.payment,
      delivery: body.delivery,
      comments: body.comments || "",
      status: "created",
      total: totalPrice,
    };
    res.status(201).json({
      status: "created",
      data: { order },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const cartService = {
  getCart: getCart,
  deleteById: deleteById,
  updateCart: updateCart,
  cartCheckout: cartCheckout,
};
