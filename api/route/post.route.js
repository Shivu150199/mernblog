import express from 'express'
import { varifyToken } from '../utils/verifyUser.js'
import { create,getPosts ,deletePost,getSinglePost, updatePost} from '../controller/post.controller.js'


const router=express.Router()

router.post('/create',varifyToken,create)
router.get('/get-post',getPosts)
router.get('/get-post/:postId',getSinglePost)
router.delete('/deletePost/:postId/:userId',varifyToken,deletePost)
router.put('/update-post/:postId/:userId',varifyToken,updatePost)

export default router