import express, { Express, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const register = async (req: Request, res: Response) => {
  try {
    const { role, email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({
        data: null,
        error: {
          message: "User Already Exists. Please Login",
        },
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      id: uuid(),
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: role === "admin" ? "admin" : "user",
    });

    return res.status(201).send({
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      error: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      data: null,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userid: user.id, email, role: user.role },
        process.env.TOKEN_KEY!,
        {
          expiresIn: "2h",
        }
      );


      return res.status(200).json({
        data: {
          token: `Bearer ${token}`,
        },
        error: null,
      });
    }
    return res.status(400).send({
      data: null,
      error: {
        message: "No user with such email or password",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      data: null,
      error: {
        message: "Internal Server error",
      },
    });
  }
};

export const userService = {
  register: register,
  login: login,
};
