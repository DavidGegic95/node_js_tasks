import { Response } from "express";
import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid";
import { AppDataSource } from "../data-source";
import { Cart } from "../entity/Cart";
// import { getTotalPrice } from "../utils/heplers/getTotal";

const getCart = async (userId: string, res: Response) => {
  try {
    let cart: Cart | undefined;
    const dataSource = AppDataSource.manager;
    const cartRepository = dataSource.getRepository(Cart);
    cart = await cartRepository.findOne({ where: { userId } });

    if (!cart) {
      const newCart = new Cart();
      newCart.userId = userId;
      newCart.isDeleted = false;
      newCart.items = [];
      await AppDataSource.manager.save(
        AppDataSource.manager.create(Cart, newCart)
      );

      return res.status(201).json({
        status: "created",
        data: { cart: newCart },
      });
    }

    res.status(200).json({
      status: "success",
      data: { cart },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const deleteById = async (userId: string, res: Response) => {
  try {
    const dataSource = AppDataSource.manager;
    const cartRepository = dataSource.getRepository(Cart);

    const emptyCart = await cartRepository.findOneBy({ userId: userId });
    if (emptyCart) {
      emptyCart.items = [];
      await cartRepository
        .createQueryBuilder()
        .update(Cart)
        .set(emptyCart)
        .where("userId = :userId", { userId: userId })
        .execute();
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
    const dataSource = AppDataSource.manager;
    const cartRepository = dataSource.getRepository(Cart);

    const updatedCart = await cartRepository.findOne({ where: { userId } });
    if (updatedCart) {
      console.log(updatedCart, "pree");
      updatedItems._id = uuid();
      console.log(updatedItems, "updatedItems");
      console.log(updatedCart, "upp cart");

      await cartRepository
        .createQueryBuilder()
        .update(Cart)
        .set(updatedCart)
        .where("userId = :userId", { userId: userId })
        .execute();
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
    const dataSource = AppDataSource.manager;
    const cartRepository = dataSource.getRepository(Cart);

    const cart = await cartRepository.findOne({ where: { userId } });

    if (!cart || cart.isDeleted) {
      return res.status(404).send("Cart not found");
    }
    const totalPrice = 0;
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
    console.log(error);
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
