import { Request, Response, Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Application is healthy",
  });
});
