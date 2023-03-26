import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@emticketsapp/common'

import { indexOrderRouter } from './routes'
import { deleteOrderRouter } from './routes/delete'
import { newOrderRouter } from './routes/new'
import { showOrderRouter } from './routes/show'

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
app.use(indexOrderRouter)
app.use(deleteOrderRouter)
app.use(newOrderRouter)
app.use(showOrderRouter)


app.all('*', async (req, res, next) => {
    next(new NotFoundError())
})

app.use(errorHandler)

export {app}