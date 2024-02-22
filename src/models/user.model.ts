import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

interface IUser {
  id: string;
  email: string;
  password: string;
  role: string;
}

export const UserSchema = new Schema<IUser>({
  id: { type: String, default: () => uuid() },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
});

const User = model("user", UserSchema);
export default User;
