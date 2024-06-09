import Comment from "../model/comment.model.js"
import { errorHandler } from "../utils/error.js"

export const createComment=async(req,res,next)=>{

try{
const {content,userId,postId}=req.body

if(userId!==req.user.id){
    return next(errorHandler('403','you are not authorised to create this'))
}

const newPost =new Comment({
    content,
    userId,
    postId
});

await newPost.save()
res.status(200).json({
    status:'success',
    data:newPost
})

}catch(err){
    next(errorHandler(404,'not able to create commnet'))
}



    

}


export const getComments=async(req,res,next)=>{


    try{
const comments=await Comment.find({postId:req.params.postId}).sort({
    createdAt:-1
})

res.status(200).json({
    status:'success',
    data:comments
})
    }
    catch(err){
        next(errorHandler(404,'not able to get all commnets'))
    }

}