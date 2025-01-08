import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { OrderCancelledEvent } from "@tikket4real/common";
import mongoose from "mongoose";
import { OrderStatus } from "@tikket4real/common";
import { Message } from "node-nats-streaming";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: "ufc202",
    price: 20,
    userId: "123",
  });
  ticket.set({ orderId });
  await ticket.save();
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { listener, ticket, data, msg };
};

it("updates the ticket, publishes an event, and acks the message", async () => {
    const { listener, ticket, data, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    const updatedTicket = await Ticket.findById(ticket.id);
    
    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})