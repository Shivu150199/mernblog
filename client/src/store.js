import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/authSlice'

export const store = configureStore({
  reducer: {
    authState: authReducer,
  },
})
