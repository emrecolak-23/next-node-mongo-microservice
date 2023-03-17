import express from 'express'
import mongoose from 'mongoose'
import 'express-async-errors'

import { currentUserRouter } from './routes/current-user'
import {singinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signupRouter)
app.use(singinRouter)
app.use(signoutRouter)

app.all('*', async (req, res, next) => {
    next(new NotFoundError())
})

app.use(errorHandler)

const start = async () => {
    
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to MongoDB')
    } catch(err) {
        console.error(err)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!')
    })

}

start()
