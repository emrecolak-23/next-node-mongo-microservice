import request from 'supertest'
import { app } from '../../app'

it('has a route handler listening to /api/tickets for posts request', async () => {
    const response = await request(app)
                            .post('/api/tickets')
                            .send({})

    expect(response.status).not.toEqual(404)
})

it('can only be access if the user is signed in', async () => {
    const response = await request(app)
                            .post('/api/tickets')
                            .send({})
    expect(response.status).toEqual(401)
})

it('returns a status other than 401 if the user signed in', async () => {
    const response = await request(app)
                            .post('/api/tickets')
                            .set('Cookie', signin())
                            .send({})
    expect(response.status).not.toEqual(401)
})

it('returns an error if an invalid title is provided', async () => {
    await request(app)
            .post('/api/tickets')
            .set('Cookie', signin())
            .send({
                title: '',
                price: 10
            })
            .expect(400)

    await request(app)
            .post('/api/tickets')
            .set('Cookie', signin())
            .send({
                price: 10
            })
            .expect(400)
})

it('returns an error if an invalid price is provided', async () => {
    await request(app)
            .post('/api/tickets')
            .set('Cookie', signin())
            .send({
                title: 'New York Fashion Week',
                price: -10
            })
            .expect(400)
    await request(app)
            .post('/api/tickets')
            .set('Cookie', signin())
            .send({
                title: 'New York Fashion Week',
            })
            .expect(400)
})

it('creates a ticket with valid inputs', async () => {
    // add in a check to make sure a ticket was saved
    await request(app)
            .post('/api/tickets')
            .send({
                title: 'New York Fashion Week',
                price: 20
            })
            .expect(201)
})