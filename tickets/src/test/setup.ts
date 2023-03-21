import {MongoMemoryServer} from 'mongodb-memory-server'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../app'

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any
beforeAll(async () => {
    mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()

    await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async() => {
    await mongo.stop()
    await mongoose.connection.close()
})



global.signin = async () => {
    // Build a JWT payload. {id, email}

    // Create the JWT!

    // Build session object {jwt: MY_JWT}

    // Turn that session into JSON

    // Take JSON and encode it as base64

    // return a string thats the cookie with encoded data
}