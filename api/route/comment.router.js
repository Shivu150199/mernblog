import express from 'express'
import { createComment,getComments ,likeComment} from '../controller/comment.controller.js'
import {varifyToken} from '../utils/verifyUser.js'
const router=express.Router()


router.post('/create-comment',varifyToken,createComment)
router.get('/get-comment/:postId',getComments)
router.put('/like-comment/:commentId',varifyToken,likeComment)

export default router