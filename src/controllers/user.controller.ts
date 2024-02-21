import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { userService } from "../services/user.service";

const userRouter = Router();

userRouter.post("/api/auth/register", async (req: Request, res: Response) => {
  await userService.register(req, res);
});

userRouter.post("/api/auth/login", async (req: Request, res: Response) => {
  await userService.login(req, res);
});

export default userRouter;
