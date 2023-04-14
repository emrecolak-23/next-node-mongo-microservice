import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@emticketsapp/common'

import { newChargeRouter } from './routes/new'



const app = express()
app.set('trust proxy', true)
app.use(express.json())

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
)
app.use(currentUser)

app.use(newChargeRouter)


app.all('*', async (req, res, next) => {
    next(new NotFoundError())
})

app.use(errorHandler)

export {app}