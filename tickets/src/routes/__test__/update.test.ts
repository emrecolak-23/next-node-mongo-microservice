import request from 'supertest'
import { app } from '../../app'

import mongoose from 'mongoose'

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
            .put(`/api/tickets/${id}`)
            .set('Cookie', signin())
            .send({
                title: 'New York Fashion Week',
                price: 20
            }).expect(404)
})

it('returns a 401 if the user not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
            .put(`/api/tickets/${id}`)
            .send({
                title: 'New York Fashion Week',
                price: 20
            }).expect(401)
})

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
                            .post('/api/tickets')
                            .set('Cookie', signin())
                            .send({
                                title: 'New York Fashion Week',
                                price: 20
                            })
    
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', signin())
            .send({
                title: 'Milano Fashion week',
                price: 20
            }).expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = signin()
    const response = await request(app)
                            .post('/api/tickets')
                            .set('Cookie', cookie)
                            .send({
                                title: 'New York Fashion Week',
                                price: 20
                            })
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                title: '',
                price: 30
            })
            .expect(400)

    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                title: 'New York Fashion Week',
                price: -10
            })
            .expect(400)
})

it('update the ticket provided valid inputs', async () => {
    const cookie = signin()
    const response = await request(app)
                            .post('/api/tickets')
                            .set('Cookie', cookie)
                            .send({
                                title: 'New York Fashion Week',
                                price: 20
                            })
                            await request(app)
                                    .put(`/api/tickets/${response.body.id}`)
                                    .set('Cookie', cookie)
                                    .send({
                                        title: 'New York Fashion Week',
                                        price: 30
                                    })
                                    .expect(200)
    
    const ticketResponse = await request(app)
                                    .get(`/api/tickets/${response.body.id}`)
                                    .send()
                                    
    expect(ticketResponse.body.title).toEqual('New York Fashion Week')
    expect(ticketResponse.body.price).toEqual(30)
})