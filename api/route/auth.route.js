import express from 'express';
import { signup,signin ,googleAuth,updateUser, deleteUser,signout} from '../controller/auth.controller.js';
import {varifyToken } from '../utils/verifyUser.js'
const router=express.Router();


router.post('/signup',signup)
router.post('/signin',signin)
router.post('/googleauth',googleAuth)
router.put('/update/:id',varifyToken,updateUser)
router.delete('/delete/:id',varifyToken,deleteUser)
router.post('/signout',signout)

export default router;