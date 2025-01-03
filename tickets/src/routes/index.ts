import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

// Define your routes here
router.get(
  "/api/tickets",
  async (req: Request, res: Response): Promise<any> => {
    const tickets = await Ticket.find({});

    res.send(tickets);
  }
);

export { router as indexTicketsRouter };
