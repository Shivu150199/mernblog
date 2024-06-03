import Post from "../model/post.model.js"
import { errorHandler } from "../utils/error.js"

export const create=async(req,res,next)=>{
console.log('req user',req.user)
if(!req.user.isAdmin){
    return next(errorHandler(400,'not authorised'))
}
if(!req.body.title||!req.body.content){
    return next(errorHandler(400,"required all fields"))
}
const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'- ')

    try{
        const newPost=await Post.create({
            ...req.body,
            slug,
            userId:req.user.id
        })

        res.status(200).json({
            status:'success',
            data:newPost
        })

    }catch(err){
        next(errorHandler(404,'not able to create the post'))
    }

}