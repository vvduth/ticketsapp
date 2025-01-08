import { Subjects, Publisher, PaymentCreatedEvent } from "@tikket4real/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}