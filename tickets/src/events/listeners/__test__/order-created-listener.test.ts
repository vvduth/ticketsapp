import { OrderCreatedListener } from './../order-created-listener';
import { natsWrapper } from "../../../nats-wrapper"
import { Ticket } from '../../../models/ticket';
import { OrderCreatedEvent } from '@tikket4real/common';
import mongoose from 'mongoose';
import { OrderStatus } from '@tikket4real/common';
import { Message } from 'node-nats-streaming';
const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    
    const ticket = Ticket.build({
        title: "ufc202",
        price: 20,
        userId: "123"
    })

    await ticket.save();

    // create a fake data event
    const data: OrderCreatedEvent["data"] ={
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        version: 0,
        userId: '123',
        expiresAt: 'dsadafq',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    }

    // create a fake data object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }


    return { listener, ticket, data, msg }
}

it('sets the orderId of the ticket', async () => {
    const { listener, ticket, data, msg } = await setup();

    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);
})

it('acks the message', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled(); 
})

it('publishes a ticket updated event', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]); 

    expect(data.id).toEqual(ticketUpdatedData.orderId);
    
})