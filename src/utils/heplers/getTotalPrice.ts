import { CartType } from "../types/cart.type";

export const getTotal = (cart: CartType) => {
  let total = 0;
  if (cart?.items?.length > 0) {
    cart.items.forEach((element: any) => {
      total = total + element?.product?.price * element?.count;
    });
  }

  return total;
};
