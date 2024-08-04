import React, { useState } from 'react'
import { Label, TextInput } from 'flowbite-react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInPending, signInRejected, signInSuccess, signInUser } from '../redux/authSlice'
import OAuth from '../component/OAuth'
import { unwrapResult } from '@reduxjs/toolkit'

const Signin = () => {
  const {loading,error,user,token,isAuthenticated}=useSelector(state=>state.authState)
 console.log(loading)
 console.log('error responce',error)
 console.log('user',user)
 console.log('token',token)
 console.log('is Authenticated',isAuthenticated)

  const [formData, setFormData] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
  
if(!email||!password){
alert('Please! provide all feilds')
return
}

try{

  const resultAction=await dispatch(signInUser({formData}))
  console.log(resultAction)
  const user=unwrapResult(resultAction)
  console.log(user)
  if(user){
    navigate('/dashboard?tab=profile')
  }
}

catch(err){
  console.log('failed to sign in ',err)
}


  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  return (
    <section className="grid md:grid-cols-2 flex-col md:flex-row gap-4 items-center justify-center">
      <div className="flex flex-col p-6 min-h-screen justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          <span className="p-1 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded ">
            CODE
          </span>{' '}
          CRAFTER
        </h1>
        <p className="font-medium w-50 text-center text-slate-500 mt-6">
        Welcome Code Creafter's was founded by Shivam singh gautam, a passionate developer with a vision to create a hub for developers to come together and share their expertise.
        </p>
      </div>
      <div className="flex-1  flex items-center justify-center flex-col mb-6">
        <form
          className="shadow p-4 rounded flex items-center justify-center flex-col w-80"
          onSubmit={handleSubmit}
        >
          <h1 className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-xl font-bold text-center">
            SignIn form
          </h1>
    
          <div className="w-full">
            <Label value="Email" />
            <TextInput
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Label value="Password" />
            <TextInput
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <button
            disabled={loading}
            tyep="submit"
            className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white hover:bg-blue-500 mt-4 w-full"
          >
            {loading ? <span className="loading">loading</span> : 'Sign In'}
          </button>
            <OAuth/>
          {/* <p className="text-red-700 text-xs">{error&&error.message}</p> */}
          <div className="mt-4">
            <span>Do not have an account ?</span>
            <Link to="/sign-up" className="text-blue-700 hover:text-blue-400">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Signin
