import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { toast } from 'react-toastify'

const initialState = {
  loading: false,
  error: null,
  token:null,
  user:null
}

export const updateUser=createAsyncThunk('updateUser/patch',async({userId,formData},{rejectWithValue})=>{
// console.log('data',data)
try{
const updatedUser=await axios.put(`/api/auth/v1/update/${userId}`,formData)

console.log(updatedUser)
toast(updatedUser.data.message)
return updatedUser.data

}
catch(err){
  rejectWithValue(err)
}

})



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.user = null
      state.error=null
      toast('logout successfull')
    },
    signInPending: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      
      state.loading = false
      state.error = null
      // state.token = action.payload.token
      state.user=action.payload
      toast(action.payload.message)
    },
    signInRejected: (state, action) => {
      state.loading = false
      state.error = action.payload
      toast(action.payload.message)
    },
    googlePending: (state) => {
      state.loading = true
    },
    googleSuccess: (state, action) => {
      console.log('action payload',action.payload)
      state.loading = false
      state.error = null
      // state.token = action.payload.token
      state.user=action.payload
      toast(action.payload.message)
    },
    googleRejected: (state, action) => {
      state.loading = false
      state.error = action.payload
      toast(action.payload.message)
    },
    updatePending: (state) => {
      state.loading = true
      state.error=null 
    },
    updateSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload
      toast(action.payload.message)
    },
    updateRejected: (state, action) => {
      state.loading = false
      state.error = action.payload
      toast(action.payload.message)
    },
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
state.loading=false
state.error=null
state.user=action.payload
    }).addCase(updateUser.rejected,(state,action)=>{
      state.loading=false
state.error=action.payload
    })
  }
})

export const {deleteUserPending,deleteUserRejected,deleteUserSuccess, signInPending, signInRejected, signInSuccess, handleLogout ,updatePending,updateRejected,updateSuccess,googlePending,googleRejected,googleSuccess} =
  authSlice.actions

export default authSlice.reducer
