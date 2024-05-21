import React, { useState } from 'react'
import {Label, TextInput} from 'flowbite-react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { timeout } from '../../utils/timeout'

const Singup = () => {
  const [formData,setFormData]=useState({})
  const [errorMessage,setErrorMessage]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const navigate=useNavigate()
const handleSubmit=async(e)=>{
  e.preventDefault()
  if(!formData.username||!formData.email||!formData.password){
    alert('Please fill all the fields')
    setErrorMessage('Please fill all the fields')
    setTimeout(()=>{
      setErrorMessage('')
    },2000)
    return
  }
  setLoading(true)
try{
let res=await axios.post('/api/auth/v1/signup',formData)
console.log(res)
setLoading(false)

navigate('/sign-in')
}catch(err){
console.log(err)
setErrorMessage('username or email already taken')
setTimeout(()=>{
  setErrorMessage('')
},2000)

setLoading(false)
// setFormData({
//   username:'',
//   email:'',
//   password:''
// })
}
}
const handleChange=(e)=>{
  setFormData({
   ...formData,
    [e.target.id]:e.target.value
  })
}
console.log(formData)
  return (
    <section className="flex flex-col md:flex-row gap-4 items-center justify-center">
      <div className="flex flex-col p-6 min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          <span className="p-1 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded ">
            MERN
          </span>{' '}
          Blog
        </h1>
        <p className="font-medium w-50">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui, sint.
        </p>
      </div>
      <div className="flex-1  flex items-center justify-center flex-col">
        <form className="shadow p-4 rounded flex items-center justify-center flex-col w-80" onSubmit={handleSubmit}>
          <h1 className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-xl font-bold text-center">
            Signup form
          </h1>
          <div className="w-full">
            <Label value="Username" />
            <TextInput type="text" placeholder="username" id="username" onChange={handleChange} />
          </div>
          <div className="w-full">
            <Label value="Email" />
            <TextInput type="email" placeholder="Email" id="email" onChange={handleChange} />
          </div>
          <div className="w-full">
            <Label value="Password" />
            <TextInput type="password" placeholder="password" id="password" onChange={handleChange} />
          </div>
          <button disabled={loading} tyep='submit' className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white hover:bg-blue-500 mt-4 w-full">
         {loading?<span className='loading'>loading</span>:'Sign Up'}
          </button>
          <p className='text-red-700 text-xs'>{errorMessage}</p>
          <div className="mt-4">
            <span>have an account ?</span>
            <Link to="/sign-in" className="text-blue-700 hover:text-blue-400">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Singup
