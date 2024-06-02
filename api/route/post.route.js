import express from 'express'
import { varifyToken } from '../utils/verifyUser.js'
import { create } from '../controller/post.controller.js'


const router=express.Router()

router.post('/create',varifyToken,create)

export default router