import { OrderCancelledListener } from "../order-cancelled-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Order } from "../../../models/order"
import mongoose, { set } from "mongoose"
import { OrderCancelledEvent, OrderStatus } from "@emticketsapp/common"
import { Message } from "node-nats-streaming"

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client)

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: new mongoose.Types.ObjectId().toHexString(),
        price: 10
    })

    await order.save()

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: order.version + 1,
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString()
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {
        listener,
        order,
        data,
        msg
    }
}

it('updates the status of the order', async () => {
    const {listener, order, data, msg} = await setup()

    await listener.onMessage(data, msg)

    const updatedOrder = await Order.findById(data.id)

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('acks the message', async () => {
    const {listener, data, msg} = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})