import { ProductModel } from "../../models/product.model";

export const getTotalPrice = async (cart: any) => {
  let total = 0;

  for (let item of cart.items) {
    let id = item.productId;
    const product: any = await ProductModel.findOne({ id });
    if (product !== null) {
      total += product.price * item.count;
    }
  }
  return total;
};
