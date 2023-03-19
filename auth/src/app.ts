import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import {singinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)
app.use(express.json())

app.use(
    cookieSession({
        signed: false,
        secure: true,

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