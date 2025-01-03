import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@tikket4real/common";
const router = express.Router();

router.get(
  "/api/tickets/:id",
  async (req: Request, res: Response): Promise<any> => {
    // Logic to fetch the ticket by id

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return new NotFoundError();
    }
    res.send(ticket);
  }
);

export { router as showTicketRouter };
