import { Schema, model, Document } from "mongoose";
import { v4 as uuid } from "uuid";

export interface IProduct extends Document {
  _id: String;
  title: string;
  description: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  _id: { type: String, default: () => uuid() },
  title: String,
  description: String,
  price: Number,
});

export const ProductModel = model<IProduct>("Product", productSchema);
