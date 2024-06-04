import express from 'express'
import { varifyToken } from '../utils/verifyUser.js'
import { create,getPosts ,deletePost} from '../controller/post.controller.js'


const router=express.Router()

router.post('/create',varifyToken,create)
router.get('/get-post',getPosts)
router.delete('/deletePost/:postId/:userId',varifyToken,deletePost)

export default router