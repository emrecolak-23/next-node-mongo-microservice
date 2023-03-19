import request from 'supertest'
import { app } from '../../app'

it('return a 201 on successful signup', async () => {
    process.env.JWT_KEY='asfdfkdfs'
    return request(app)
            .post('/api/users/signup')
            .send({
                email: 'colakkemre@gmail.com',
                password: 'pass123'
            })
            .expect(201)
})

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'asasklaksa',
            password: 'pass123'
        })
        .expect(400)
})

it('returns a 400 with an invalid password', async () =>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'colakkemre@gmail.com',
            password: ''
        })
        .expect(400)
})

it('return a 400 with missing email and password', async () => {
    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'colakkemre@gmail.com'
            })
            .expect(400)
    
    await request(app)
            .post('/api/users/signup')
            .send({
                password: 'pass123'
            })
            .expect(400)
})

it('disallows duplicate emails', async () => {
    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'colakkemre@gmail.com',
                password: 'pass123'
            })
            .expect(201)
    await request(app)
            .post('/api/users/signup')
            .send({
                email:'colakkemre@gmail.com',
                password: 'pass123'
            })
            .expect(400)
})