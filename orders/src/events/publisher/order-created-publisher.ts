import { Publisher, OrderCreatedEvent, Subjects } from "@tikket4real/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
