import express from "express";

const router = express.Router()

router.post('/api/users/singin', (req,res) => {
    res.send("hi there ")
})

export {router as singInRouter} ;