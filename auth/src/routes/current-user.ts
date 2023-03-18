import express from 'express'
import { currentUser } from '../middlewares/current-user'
const router = express.Router()

import { requireAuth } from '../middlewares/require-auth'

router.get('/api/users/currentuser', currentUser, requireAuth,(req, res) => {
    res.send({currentUser: req.currentUser || null})
})

export {router as currentUserRouter}