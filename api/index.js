import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const app =express()
const port=process.env.PORT||3000

app.get('/',(req,res)=>{
    res.send('hello world')
})


let connection=mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('ha bhai ho gaya connect')
})

app.listen(port,async()=>{
    await connection
    console.log('ha bhai chal gaya ')
})