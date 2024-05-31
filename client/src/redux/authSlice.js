import { createSlice } from '@reduxjs/toolkit'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialState = {
  loading: false,
  error: null,
  user: {},
}
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
      state.user = action.payload
      toast(action.payload.message)
    },
    signInRejected: (state, action) => {
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
  },
})

export const { signInPending, signInRejected, signInSuccess, handleLogout ,updatePending,updateRejected,updateSuccess} =
  authSlice.actions

export default authSlice.reducer
