import { Request, Response } from "express";
import Joi from "joi";

const productInfoSchema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().integer().min(0).required(),
});

export const validateRequestBody = (req: Request, res: Response, next: any) => {
  const { error } = productInfoSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      data: null,
      error: {
        message: "Bad request body. (joi)",
      },
    });
  } else {
    next();
  }
};
