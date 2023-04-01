import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedEvent, OrderStatus } from "@emticketsapp/common";
import { Ticket } from "../../../models/ticket";
import mongoose, { mongo } from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client)
    
    // Create and Save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 100,
        userId: new mongoose.Types.ObjectId().toHexString()
    })

    await ticket.save()

    // Create fake data event
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: new mongoose.Types.ObjectId().toHexString(),
        expiresAt: 'asasalsa',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    }
    // Create a fake message 
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {
        listener,
        ticket,
        data,
        msg
    }
}

it('sets the orderId of the ticket', async () => {
    const {listener, ticket, data, msg} = await setup()

    await listener.onMessage(data, msg)

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket!.orderId).toEqual(data.id)

})

it('acks the message', async () => {
    const { listener, data, msg, ticket } = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})