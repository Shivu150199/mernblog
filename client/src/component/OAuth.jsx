import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
const OAuth = () => {

const handleGoogle=async(e)=>{
e.preventDefault()
try{
const provider =new GoogleAuthProvider()
const auth=getAuth(app)
const result=await signInWithPopup(auth,provider)
console.log(result)
}catch(error){
console.log(error)
}
}
  return (
    <div className='flex w-full mt-5'>
      <button onClick={handleGoogle} className="bg-gradient-to-r from-red-700 via-slate-400 to-slate-300 btn w-full">
        Google Sign in
      </button>
    </div>
  )
}

export default OAuth
