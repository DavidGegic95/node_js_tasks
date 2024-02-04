import { cartRepository } from "../repositories/cart.repository";
import { v4 as uuidv4 } from "uuid";
import { CartType } from "../utils/types/cart.type";
import { getTotal } from "../utils/heplers/getTotalPrice";

const getCart = async (userId: string) => {
  let cart = await cartRepository.getCart(userId);
  if (!cart) {
    cart = {
      id: userId,
      items: [],
    };
    const createdCart = await cartRepository.createCart(cart);
  }
  const total = getTotal(cart);

  const cartBody = {
    data: {
      cart: cart,
      total: total,
      error: null,
    },
  };
  return cartBody;
};

const deleteById = async (cartId: string) => {
  let isDelted = await cartRepository.deleteById(cartId);
  let body;
  if (isDelted) {
    body = {
      data: {
        success: true,
      },
      error: null,
    };
  } else {
    body = {
      data: {
        success: false,
      },
      error: `Cart with ID:${cartId} does not exist. Please check the provided cart ID.`,
    };
  }
  return body;
};

const updateCart = async (productInfo: any) => {
  const body = await cartRepository.updateCart(productInfo);
};

export const cartService = {
  getCart: getCart,
  deleteById: deleteById,
  updateCart: updateCart,
};
