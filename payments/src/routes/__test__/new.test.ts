import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Order } from '../../models/order'
import { OrderStatus } from '@emticketsapp/common'

it('returns a 404 when purchasing an order that does not exist', async () => {
    await request(app)
            .post('/api/payments')
            .set('Cookie', signin())
            .send({
                token: 'asdksfd',
                orderId: new mongoose.Types.ObjectId().toHexString()
            })
            .expect(404)
})

it('returns a 401 when purchasing an order that doesnt belong to the user', async () => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: new mongoose.Types.ObjectId().toHexString(),
        price: 100,
        status: OrderStatus.Created
    })

    await order.save()

    await request(app)
        .post('/api/payments')
        .set('Cookie', signin())
        .send({
            token: 'askafsfs',
            orderId: order.id
        })
        .expect(401) 

})

it('returns a 400 when purchasing a cancelled order', async () => {

    const userId = new mongoose.Types.ObjectId().toHexString()

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: userId,
        price: 100,
        status: OrderStatus.Cancelled
    })

    await order.save()

    await request(app)
            .post('/api/payments')
            .set('Cookie', signin(userId))
            .send({
                token: 'asaffg',
                orderId: order.id
            })
            .expect(400)

})