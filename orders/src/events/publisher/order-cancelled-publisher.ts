import { Subjects, Publisher, OrderCancelledEvent } from "@tikket4real/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
