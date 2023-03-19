import request from 'supertest'
import { app } from '../../app'

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
            .post('/api/users/signin')
            .send({
                email: 'colakkemre@gmail.com',
                password: 'pass123'
            })
            .expect(400)
})

it('fails when an incorrect password supplied', async() => {
    process.env.JWT_KEY='asfdfkdfs'

    await request(app)
            .post('/api/users/signup')
            .send({
                email:'colakkemre@gmail.com',
                password: 'pass123'
            })
            .expect(201)

    await request(app)
            .post('/api/users/signin')
            .send({
                email: 'colakkemre@gmail.com',
                password: 'pass1234'
            })
            .expect(400)
})

it('respond with a cookie when given valid credentials', async () => {
    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'colakkemre@gmail.com',
                password: 'pass123'
            })
            .expect(201)

    const response = await request(app)
                            .post('/api/users/signin')
                            .send({
                                email: 'colakkemre@gmail.com',
                                password: 'pass123'
                            })
                            .expect(200)
    
    expect(response.get('Set-Cookie')).toBeDefined()
})