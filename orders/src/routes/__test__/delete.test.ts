import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@tikket4real/common";

it("marks an order as cancelled", async () => {
  // cretae a ticket
  const ticket = Ticket.build({
    title: "UFC event",
    price: 20,
  });
  await ticket.save();

  // make a request to create an order
  const user = global.signin();

  const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);
  // make a request to cancel the order

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  // expect the order to be cancelled

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
