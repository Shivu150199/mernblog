import React, { useState } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { signInPending, signInRejected, signInSuccess } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
  const dispatch=useDispatch()
const {user,error,loading}=useSelector(state=>state.authState)
const navigate=useNavigate()
const handleGoogle=async(e)=>{
e.preventDefault()
dispatch(signInPending())
try{
const provider =new GoogleAuthProvider()
const auth=getAuth(app)
const result=await signInWithPopup(auth,provider)
console.log(result.user.photoURL)

let res = await axios.post('http://localhost:3000/api/auth/v1/googleauth', {
  username: result.user.displayName,
  email: result.user.email,
  photo: result.user.photoURL,
})
console.log(res.data)
dispatch(signInSuccess(res.data))
navigate('/dashboard')
}catch(error){
  dispatch(signInRejected(err))
console.log(error)
}
}
  return (
    <div className='flex w-full mt-5'>
      <button onClick={handleGoogle} className="bg-gradient-to-r from-red-700 via-slate-400 to-slate-300 btn w-full">
     {loading?'loading....':'google sign in'}
      </button>
    </div>
  )
}

export default OAuth
