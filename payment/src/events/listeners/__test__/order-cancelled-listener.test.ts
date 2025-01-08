import mongoose from 'mongoose';
import { OrderStatus, OrderCancelledEvent } from '@tikket4real/common';
import { Message } from 'node-nats-streaming';
import {OrderCancelledListener} from '../order-cancelled-listener';
import {natsWrapper} from "../../../nats-wrapper";
import { Order } from '../../../models/order';
const setup = async () => { 
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        price: 10,
        userId: 'asdasd',
        version: 0
    })

    await order.save();

    const data: OrderCancelledEvent["data"] = {
        id: order.id,
        version: 1,
        ticket: {
            id: 'asdasd'
        }
    }

    const msg: Partial<Message> = { 
        ack: jest.fn()
    }
    return { listener, order, data, msg }

}

it('updates the status of the order', async () => {
    const { listener, order, data, msg } = await setup();
    await listener.onMessage(data, msg as Message);
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
})

it('acks the message', async () => {
    const { listener, order, data, msg } = await setup();
    await listener.onMessage(data, msg as Message);
    expect(msg.ack).toHaveBeenCalled();

})