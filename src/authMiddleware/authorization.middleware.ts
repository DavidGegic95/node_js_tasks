import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || "";
  const [tokenType, token] = authHeader.split(" ");
  const decoded: any = jwt.verify(token, process.env.TOKEN_KEY!);

  if ("role" in decoded && decoded.role !== "admin") {
    return res.status(403).send("Only admins can delete cart");
  }
  next();
};
