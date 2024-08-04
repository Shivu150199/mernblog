import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { toast } from 'react-toastify'

const initialState = {
  loading: false,
  error: null,
  token:null,
  user:null,
  isAuthenticated:false
}

export const updateUser=createAsyncThunk('updateUser/patch',async({userId,formData},{rejectWithValue})=>{
// console.log('data',data)
try{
const updatedUser=await axios.put(`/api/auth/v1/update/${userId}`,formData)
console.log('updated user in slice',updatedUser)

if(updatedUser.data.status!=200){
  return rejectWithValue(updatedUser.data)
   
 }
 

return updatedUser.data

}
catch(err){
  rejectWithValue(err)
}

})

export const signInUser=createAsyncThunk('signInUser/post',async({formData},{rejectWithValue})=>{
console.log(formData)
  try{
const response=await axios.post('/api/auth/v1/signin',formData)
console.log(response)
if(response.data.status!==200){
 return rejectWithValue(response.data)
  
}

return response.data
  }catch(err){
    rejectWithValue(err)
  }
})


export const googleAuthUser=createAsyncThunk('googleAuthUser/post',async(formData,{rejectWithValue})=>{

  try{
const res=await axios.post('/api/auth/v1/googleauth',formData)


if(res.data.status!=200){
  return rejectWithValue(res.data)
   }

return res.data

  }
  catch(err){
    rejectWithValue(err)
  }

})

export const signOutUser=createAsyncThunk('signOutUser/post',async(_,{rejectWithValue})=>{

try{
let res=await axios.post('/api/auth/v1/signout')
return res

}
catch(err){
  rejectWithValue(err)
}

})



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  
   
   

    // googlePending: (state) => {
    //   state.loading = true
    // },
    // googleSuccess: (state, action) => {
    //   console.log('action payload',action.payload)
    //   state.loading = false
    //   state.error = null
    //   // state.token = action.payload.token
    //   state.user=action.payload
    //   toast(action.payload.message)
    // },
    // googleRejected: (state, action) => {
    //   state.loading = false
    //   state.error = action.payload
    //   toast(action.payload.message)
    // },
    // updatePending: (state) => {
    //   state.loading = true
    //   state.error=null 
    // },
    // updateSuccess: (state, action) => {
    //   state.loading = false
    //   state.error = null
    //   state.user = action.payload
    //   toast(action.payload.message)
    // },
    // updateRejected: (state, action) => {
    //   state.loading = false
    //   state.error = action.payload
    //   toast(action.payload.message)
    // },
    deleteUserPending:(state)=>{
      state.loading=true
      state.error=null
    },
    deleteUserSuccess:(state)=>{
      state.loading=false
      state.user=null
      state.error=null
      toast('user deleted successfully')
    },
    deleteUserRejected:(state,action)=>{
state.loading=false
state.error=action.payload
toast(action.payload.message)
    }
    
  },
  extraReducers:(builder)=>{
    builder.addCase(updateUser.pending,(state)=>{
state.loading=true
state.error=null
    }).addCase(updateUser.fulfilled,(state,action)=>{
      console.log('updated user',action.payload)
state.loading=false
state.error=null
state.user=action.payload.data
toast(action.payload.message)
    }).addCase(updateUser.rejected,(state,action)=>{
      state.loading=false
state.error=action.payload
toast(action.payload.message)

    }).addCase(signInUser.pending,(state)=>{
      state.loading=true
      state.error=null

    }).addCase(signInUser.fulfilled,(state,action)=>{
    
      state.loading=false
      state.error=null
      state.token=action.payload.token
      state.user=action.payload.data
      state.isAuthenticated=true
      // state.token=action.payload.token
      
    }).addCase(signInUser.rejected,(state,action)=>{

      state.loading=false
      state.error=action.payload
      toast(`${action.payload.message} in ${action.payload.status}`)
    }).addCase(signOutUser.pending,(state)=>{
state.loading=true
    }).addCase(signOutUser.fulfilled,(state)=>{
      state.loading=false
      state.user = null
      state.error=null
      state.token=null
      state.isAuthenticated=false
      toast('logout successfull')
    }).addCase(signOutUser.rejected,(state,action)=>{
      state.loading=false
state.error=action.payload
    }).addCase(googleAuthUser.pending,(state)=>{
      state.loading=true
      state.error=null

    }).addCase(googleAuthUser.fulfilled,(state,action)=>{
 
      state.loading=false
      state.error=null
      state.token=action.payload.token
      state.user=action.payload.data
      state.isAuthenticated=true
      toast(action.payload.message)
      // state.token=action.payload.token
      
    }).addCase(googleAuthUser.rejected,(state,action)=>{
  
      state.loading=false
      state.error=action.payload
      toast(`${action.payload.message} in ${action.payload.status}`)
    })
  }
})

export const {deleteUserPending,deleteUserRejected,deleteUserSuccess, signInPending, signInRejected, signInSuccess, handleLogout ,updatePending,updateRejected,updateSuccess,googlePending,googleRejected,googleSuccess} =
  authSlice.actions

export default authSlice.reducer
