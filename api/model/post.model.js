import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
    userId:{
type:String,
required:true
    },
title:{
    type:String,
    required:[true,'title is required'],
    unique:true
},
content:{
    type:String,
    required:[true,'content is required']
},
poster:{
    type:String,
    default:'https://static.vecteezy.com/system/resources/previews/001/410/877/non_2x/programming-and-coding-futuristic-banner-vector.jpg'
},
category:{
    type:String,
    default:'uncategorised'
}, 
slug:{
    type:String,
    required:true,
    unique:true 
}
},{timestamps:true})


const Post=mongoose.model('POST',PostSchema)

export default Post