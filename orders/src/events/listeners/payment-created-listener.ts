import { Listener, Subjects, PaymentCreatedEvent } from "@tikket4real/common";
import {Message} from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../../models/order";
import { OrderStatus } from "@tikket4real/common"; 
export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({status: OrderStatus.Complete});
    await order.save();
        

    msg.ack();
  }
}