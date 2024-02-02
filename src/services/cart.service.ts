import { cartRepository } from "../repositories/cart.repository";
import { v4 as uuidv4 } from "uuid";
import { CartType } from "../utils/types/cart.type";

const getCart = async () => {
  const cart = await cartRepository.getCart();
  if (cart) {
    return cart;
  } else {
    const newCart: CartType = {
      id: uuidv4(),
      items: [],
    };
    const createdCart = await cartRepository.createCart(newCart);
    console.log(createdCart);
    return newCart;
  }
};

export const cartService = {
  getCart: getCart,
};
