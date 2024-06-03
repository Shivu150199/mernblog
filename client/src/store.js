import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/authSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import postReducer from './redux/postSlice'
export const rootReducer=combineReducers({
  authState:authReducer,
  postState:postReducer
})

const persistConfig={
  key:'root',
  storage,
  version:1
  
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export const persistor=persistStore(store)