import { errorHandler } from './error.js'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

export const varifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  console.log('token',token)
  if (!token) return next(errorHandler(401, 'not authorized'))

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'not authorized'))
    }

    req.user = user


    next()
  })
}
