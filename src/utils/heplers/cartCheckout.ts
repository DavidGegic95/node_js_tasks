import { CartType } from "../types/cart.type";
import { getTotal } from "./getTotalPrice";

export const cartCheckoutHelper = (cart: CartType) => {
  const body = {
    data: {
      order: {
        id: cart.id,
        userId: cart.id,
        cartId: cart.id,
        items: cart.items,
        payment: {
          type: "paypal",
          address: "London",
          creditCard: "1234-1234-1234-1234",
        },
        delivery: {
          type: "post",
          address: "London",
        },
        comments: "",
        status: "created",
        total: getTotal(cart),
      },
    },
    error: null,
  };
  return body;
};
