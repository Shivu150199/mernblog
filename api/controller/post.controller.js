import Post from "../model/post.model.js"
import { errorHandler } from "../utils/error.js"

export const createPost=async(req,res,next)=>{

if(!req.user.isAdmin){
    return res.send({
        status:403,
        message:'not authorised'
    })
}
if(!req.body.title||!req.body.content){
    return res.send({
        status:400,
        message:'require all feilds'
    })
}
const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'- ')

    try{
        const newPost=await Post.create({
            ...req.body,
            slug,
            userId:req.user.id
        })

        return res.send({
            status:200,
            message:'successfully created',
            data:newPost
        })

    }catch(err){
        next(errorHandler(500,'not able to create the post'))
    }

}


export const getPosts=async(req,res,next)=>{

    
    try{
    const startIndex=parseInt(req.query.startIndex)||0
    const limit=parseInt(req.query.limit)||9
const sortDirection=req.query.order==='asc'?1:-1
const posts=await Post.find({
    ...(req.query.userId&&{userId:req.query.userId}),
    ...(req.query.category&&{category:req.query.category}),
    ...(req.query.slug&&{slug:req.query.slug}),
    ...(req.query.postId&&{_id:req.query.postId}),
    ...(req.query.searchTerm&&{
        $or:[
            {title:{$regex:req.query.searchTerm,$options:'i'}},
            {content:{$regex:req.query.searchTerm,$options:'i'}}
        ]
    }),

}).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit)

const totalPosts=await Post.countDocuments()

const now=new Date()
const oneMonthAgo=new Date(
    now.getFullYear(),
    now.getMonth()-1,
    now.getDate()
)
const lastMonthPosts=await Post.countDocuments({
    createdAt:{$gte:oneMonthAgo},
})
return res.send({
    status:200,
    message:'post get',
    posts,
    totalPosts,
    lastMonthPosts
})
}
catch(err){
    return res.send({
        status:500,
        message:'internal server error',
        error:err
    })
}
}


export const deletePost=async(req,res,next)=>{
if(!req.user.isAdmin||req.user.id!==req.params.userId){
    return next(errorHandler(404,'you are not authorised'))
}

try{
await Post.findByIdAndDelete(req.params.postId)

res.status(204).json({
   status:'success',
   message:'post deleted successfully'
})
}catch(err){
next(errorHandler((err)))
}


}


export const getSinglePost=async(req,res,next)=>{
const postId=req.query.params
    try{
const singelPost=await Post.findById(postId)

res.status(200).json({
    status:'success',
    data:singelPost[0
        
    ]
})



    }catch(
err
    ){
        next(errorHandler(404,'not able to get this data'))
    }

}


export const updatePost=async(req,res,next)=>{

if(!req.user.isAdmin||req.user.id!==req.params.userId){
    return next(errorHandler(403,'not allowed to do update'))
}

try{
const updatedPost=await Post.findByIdAndUpdate(req.params.postId,{$set:{
    title:req.body.title,
    content:req.body.content,
    category:req.body.category,
    poster:req.body.poster

}},{new:true})

res.status(200).json({
    status:'success',
    data:updatedPost
})

}
catch(error){
next(errorHandler(404,'not able to update the post'))

}


}