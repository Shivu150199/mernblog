import { createSlice } from "@reduxjs/toolkit";
import authSlice, { updatePending, updateSuccess } from "./authSlice";
import { toast } from "react-toastify";

const initialState={
loading:false,
error:null,
postList:null

}


const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        createPostPending:(state)=>{
state.loading=true;
state.error=null
        },
        createPostSuccess:(state,action)=>{
            state.loading=false
            state.postList=action.payload
            state.error=null
            toast('post created successfully')
        },
        createPostFail:(state,action)=>{
            state.error=action.payload
            state.loading=false
toast('post not created')

        },
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
    }
})


export const {createPostFail,createPostPending,createPostSuccess,updateFailure,updatePostPending,updatePostSuccess}=postSlice.actions

export default postSlice.reducer