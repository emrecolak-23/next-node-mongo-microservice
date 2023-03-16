import express from 'express'

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

app.listen(3000, () => {
    console.log('Listening on port 3000!!!')
})