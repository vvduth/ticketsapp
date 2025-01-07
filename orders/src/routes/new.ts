import { requireAuth, validateRequest } from "@tikket4real/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ticket id must be provided"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.send("Hello from orders service");
  }
);

export { router as newOrdersRouter };
