import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
    res.send('By there!')
})

export {router as signoutRouter}