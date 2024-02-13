import { Request, Response } from "express";

const users = [{ id: "123" }, { id: "321" }];

export const authMiddleware = (req: Request, res: Response, next: any) => {
  const userId = req.headers["x-user-id"];
  if (!userId) {
    return res.status(401).json({
      data: null,
      error: {
        message: "You must be authorized user",
      },
    });
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({
      data: null,
      error: {
        message: "User is not authorized",
      },
    });
  }

  next();
};
