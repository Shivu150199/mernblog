import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
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

        }
    }
})


export const {createPostFail,createPostPending,createPostSuccess}=postSlice.actions

export default postSlice.reducer