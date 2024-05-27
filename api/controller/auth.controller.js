import User from '../model/auth.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body
    if (
      (!username || !password || !email || username === '',
      email === '',
      password === '')
    ) {
      // return res.status(403).send({
      //     status: 'Forbidden',
      //     message:'kis bat ki jaldi hai sari requirement fill karo'})
    return  next(errorHandler(403, 'kis bat ki jaldi hai sari requirement fill karo'))
    }
    const pass = bcryptjs.hashSync(password, 10)
    const rest = await User.create({ username, email, password: pass })

    return res.status(201).send({
      status: 'success',
      message: 'user created',
      data: rest,
    })
  } catch (err) {
    next(errorHandler(401, 'signup failed'))
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body
  if ((!email || !password || email === '', password === '')) {
    next(errorHandler(400, 'requird all fileds'))
  }

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(404, 'data not found'))
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) {
      return next(errorHandler(400, 'wrong password'))
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY)
    const { password: pass, ...rest } = validUser._doc
    res.status(200).cookie('access_token', token, { httpOnly: true }).json({
      status: 'success',
      message: 'login successfull',
      data: rest,
      token,
    })
  } catch (err) {
    next(errorHandler(404, 'page not found'))
  }
}

export const googleAuth = async (req, res, next) => {
  const { email, username, photo } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
      const { password, ...rest } = user._doc
      res.status(200).cookie('access_token', token, { httpOnly: true }).json({
        status: 'success',
        message: 'login successfull',
        data: rest,
        token,
      })
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = await User.create({
        email,
        photo,
        username:
          username.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        password: hashedPassword,
      })
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY)
      const { password, ...rest } = newUser._doc
      res.status(200).cookie('access_token', token, { httpOnly: true }).json({
        status: 'success',
        message: 'login successfull',
        data: rest,
        token,
      })
    }
  } catch (err) {
    next(errorHandler(404, 'google login failed '))
  }
}

export const updateUser = async (req, res, next) => {
  let userId = req.user.id
  let paramId = req.params.id
  console.log('userid',userId)
  console.log("paramid",paramId)

  if (userId !== paramId) {
    return next(errorHandler(401, 'you are not allowed to update this user'))
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(403, 'password must be greater than 6 owrds'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }

  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(errorHandler(403, 'username should not less than 3 or greater than 20'))
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(403, 'username can not contains spaces'))
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(403, 'username should be in lowercase'))
    }
    // if (req.body.username.match(/^[a-zA-Z0-9]+$/)) {
    //   return next(errorHandler(403, 'usernaem can not contains special characters'))
    // }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        photo:req.body.photo,
    
      }
    }, {
      new: true,
     
    })
    if (!updateUser) {
      return next(errorHandler(404, 'user not found'))
    }

    const { password, ...rest } = updatedUser._doc
    res.status(200).json({
      status: 'success',
      message: 'user updated successfully',
      data: rest,
    })
  } catch (err) {
    next(errorHandler(404, 'user update failes'))
  }
}
