import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './route/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()

const port = process.env.PORT || 3000
app.use(cors())

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth/v1', authRouter)

//middleware for error hadnling
app.use((err, req, res, next) => {
  const status = err.statusCode || 500
  const message = err.message || 'internal server error'
  res.status(status).json({
    success: false,
    message,
    status,
  })
})

let connection = mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('ha bhai ho gaya connect')
})

app.listen(port, async () => {
  await connection
  console.log('ha bhai chal gaya ')
})
