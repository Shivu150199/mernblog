import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './route/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import postRouter from './route/post.route.js'
import commentRouter from './route/comment.router.js'
import path from 'path'
dotenv.config()
const app = express()

const port = process.env.PORT || 3000
app.use(cors())

app.use(express.json())
app.use(cookieParser())

const __dirname=path.resolve()

app.use('/api/auth/v1', authRouter)
app.use('/api/post/v1', postRouter)
app.use('/api/comment/v1', commentRouter)
app.use(express.static(path.join(__dirname,'/client/dist')))


app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

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
