import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authSlice, { updatePending, updateSuccess } from "./authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { act } from "react";

const initialState={
loading:false,
error:null,
newPost:null,
postList:[],
showMore:true

}

export const createPost=createAsyncThunk('createPost/post',async({formData},{rejectWithValue})=>{



try{
const createdPost=await axios.post('/api/post/v1/create',formData)

console.log(createdPost)

return createdPost.data

}catch(err){
    rejectWithValue(err)
}


})

export const getAllPost=createAsyncThunk('getAllPost/get',async(userId,{rejectWithValue})=>{
console.log(userId)
try{

    const res=await axios.get(`/api/post/v1/get-post?userId=${userId}`)
 
    if(res.data.status!=200){
        return rejectWithValue(res.data)
    }
    return res.data

}catch(err){
    console.log('error',err)
    rejectWithValue(err)
}


})




const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{

        updatePostPending:(state)=>{
            state.loading=true
            state.error=null

        
        },
        updatePostSuccess:(state)=>{
            state.loading=false
            state.error=null
toast('successfuly updated')
        },
        updateFailure:(state,action)=>{
state.error=action.payload
state.loading=false
toast('updation failed')
        }
    },extraReducers:(builder)=>{
        builder.addCase(createPost.pending,(state)=>{
            state.loading=true;
state.error=""
        }).addCase(createPost.fulfilled,(state,action)=>{
            state.loading=false
            state.newPost=action.payload.data
            state.error=""
            // <Navigate to='/post/'>
            toast(action.payload.message)
        }).addCase(createPost.rejected,(state,action)=>{
state.error=action.payload.message
state.loading=false
toast(action.payload.message)
        }).addCase(getAllPost.pending,(state,action)=>{
            state.loading=true
            state.error=null

          
                    }).addCase(getAllPost.fulfilled,(state,action)=>{
                        console.log(action.payload)
                        state.postList=action.payload.posts
                        state.loading=false
                        state.error=null
                        
                        toast(action.payload.message)
          
                    }).addCase(getAllPost.rejected,(state,action)=>{
          state.error=action.payload
          state.loading=false
          toast(action.payload.message)
                    })
    }
})


export const {createPostFail,createPostPending,createPostSuccess,updateFailure,updatePostPending,updatePostSuccess}=postSlice.actions

export default postSlice.reducer