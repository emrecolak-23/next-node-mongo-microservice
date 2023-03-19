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