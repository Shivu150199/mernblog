import React from 'react'
import {Label, TextInput} from 'flowbite-react'
import { Link } from 'react-router-dom'
const Singup = () => {
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
        <form className="shadow p-4 rounded flex items-center justify-center flex-col w-80">
          <h1 className="text-blue-700 text-xl font-bold text-center">
            Signup form
          </h1>
          <div className="w-full">
            <Label value="Username" />
            <TextInput type="text" placeholder="username" id="username" />
          </div>
          <div className="w-full">
            <Label value="Email" />
            <TextInput type="email" placeholder="Email" id="email" />
          </div>
          <div className="w-full">
            <Label value="Password" />
            <TextInput type="password" placeholder="password" id="passowrd" />
          </div>
          <button className="btn bg-blue-600 text-white hover:bg-blue-500 mt-4 w-full">Sign Up</button>
<div className='mt-4'>
  <span>have an account ?</span><Link to='/sign-in' className='text-blue-700 hover:text-blue-400'>Login</Link>
</div>

        </form>
      </div>
    </section>
  )
}

export default Singup
