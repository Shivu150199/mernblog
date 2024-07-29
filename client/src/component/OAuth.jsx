import React, { useState } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { googlePending, googleRejected, googleSuccess } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
  const dispatch=useDispatch()
const {error,loading}=useSelector(state=>state.authState)
const navigate=useNavigate()
const handleGoogle=async(e)=>{
e.preventDefault()
try{
  dispatch(googlePending())
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
dispatch(googleSuccess(res.data))
navigate('/dashboard?tab=profile')
}catch(error){
  dispatch(googleRejected(error))
console.log(error)
}
}
  return (
    <div className='flex w-full mt-5'>
      <button  onClick={handleGoogle} className="capitalize bg-gradient-to-r from-red-700 via-slate-400 to-slate-300 btn w-full">
     {loading?'loading....':'google sign in'}
      </button>
    </div>
  )
}

export default OAuth
