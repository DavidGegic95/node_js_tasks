import { cartRepository } from "../repositories/cart.repository";
import { v4 as uuidv4 } from "uuid";
import { CartType } from "../utils/types/cart.type";
import { getTotal } from "../utils/heplers/getTotalPrice";
import { cartCheckoutHelper } from "../utils/heplers/cartCheckout";
import { responseBody } from "../utils/responseMessages/responses";

const getCart = async (headers: any) => {
  const userId = headers["x-user-id"];
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

const deleteById = async (headers: any) => {
  const cartId = headers["x-user-id"];
  let isDeleted = await cartRepository.deleteById(cartId);

  return responseBody(isDeleted, cartId);
};

const updateCart = async (productInfo: any, headers: any) => {
  const body = await cartRepository.updateCart(productInfo, headers);
  return body;
};

const cartCheckout = async (headers: any) => {
  const userId = headers["x-user-id"];
  const cart = await cartRepository.getCart(userId);
  if (cart) {
    const body = cartCheckoutHelper(cart);
    return body;
  } else {
    return {
      data: null,
      error: {
        message: "Cart is empty",
      },
    };
  }
};

export const cartService = {
  getCart: getCart,
  deleteById: deleteById,
  updateCart: updateCart,
  cartCheckout: cartCheckout,
};
