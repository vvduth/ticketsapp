import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "@tikket4real/common"
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response): any | Promise<any> => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
