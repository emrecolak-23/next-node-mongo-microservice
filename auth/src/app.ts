import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import {singinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler, NotFoundError } from '@emticketsapp/common'

const app = express()
app.set('trust proxy', true)
app.use(express.json())

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
)

app.use(currentUserRouter)
app.use(signupRouter)
app.use(singinRouter)
app.use(signoutRouter)

app.all('*', async (req, res, next) => {
    next(new NotFoundError())
})

app.use(errorHandler)

export {app}