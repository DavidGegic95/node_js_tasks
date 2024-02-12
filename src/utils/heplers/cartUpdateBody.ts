import { CartType } from "../types/cart.type";
import { getTotal } from "./getTotalPrice";

export const cartUpdateBody = (cart: CartType) => {
  return {
    data: {
      cart: {
        id: cart.id,
        items: cart.items,
      },
      total: getTotal(cart),
    },
    error: null,
  };
};
