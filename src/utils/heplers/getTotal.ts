// export const getTotalPrice = async (cart: any) => {
//   var total = 0;

//   for (let item of cart.items) {
//     let id = item._id.toHexString();
//     const product: any = await ProductModel.findById(id);
//     if (product !== null) {
//       total += product.price * item.count;
//     }
//   }
//   return total;
// };
