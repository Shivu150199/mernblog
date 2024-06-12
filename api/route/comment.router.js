import express from 'express'
import { createComment,getComments ,likeComment,editComment,deleteComment} from '../controller/comment.controller.js'
import {varifyToken} from '../utils/verifyUser.js'
const router=express.Router()


router.post('/create-comment',varifyToken,createComment)
router.get('/get-comment/:postId',getComments)
router.put('/like-comment/:commentId',varifyToken,likeComment)
router.put('/edit-comment/:commentId',varifyToken,editComment)
router.delete('/delete-comment/:commentId',varifyToken,deleteComment)

export default router