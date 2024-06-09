import express from 'express'
import { createComment,getComments } from '../controller/comment.controller.js'
import {varifyToken} from '../utils/verifyUser.js'
const router=express.Router()


router.post('/create-comment',varifyToken,createComment)
router.get('/get-comment/:postId',getComments)

export default router