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
      toast('logout successfull')
    },
    signInPending: (state, action) => {
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
  },
})

export const { signInPending, signInRejected, signInSuccess, handleLogout } =
  authSlice.actions

export default authSlice.reducer
