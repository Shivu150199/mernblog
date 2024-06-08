import express from 'express'
import { createComment } from '../controller/comment.controller.js'
import {varifyToken} from '../utils/verifyUser.js'
const router=express.Router()


router.post('/create-comment',varifyToken,createComment)

export default router