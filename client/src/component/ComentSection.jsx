import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ComentSection = ({postId}) => {
    const [comment,setCommnet]=useState('')
    const[loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const{user}=useSelector(state=>state.authState)
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
if(comment.length>200){
    return ;
}

try{
    setLoading(true)
const res=await axios.post('/api/comment/v1/create-comment',{content:comment,postId,userId:user.data._id})
console.log('comment ',res)
setLoading(false)
setError(null)
setCommnet('')
}
catch(err){
    console.log(err)
setError(err)
setLoading(false)
setCommnet('')
}


    }
  return (
    <div className='w-80'>
        {user?(<div className='flex gap-2 my-4 items-center'>
<p className='text-[1rem] font-bold'>Signed in as :</p>
<img className='w-5 h-5 object-cover rounded-full ' src={user.data.photo} alt="" />
<Link to='/dashboard?tab=profile'>
<span className='text-cyan-500 hover:underline'>@{user.data.username}</span>
</Link>

        </div>):(
            <div>

            
            <Link className='btn bg-gradient-to-r from-green-400 to-blue-500 text-white mx-auto' to='sign-in'>
        Go to sign in page
        </Link>
            </div>
    )}

{
    user&&(
<form onSubmit={handleSubmit} className='w-full p-4 rounded border border-teal-600'>
    <Textarea value={comment} placeholder='Add a comment' rows='3' maxLength='200' className='w-full' onChange={(e)=>setCommnet(e.target.value)}/>
    <div className='flex justify-between my-2 items-center'>
        <p className='text-xs'>{200-comment.length} characters remaining</p>
        <Button type='submit' outline className='bg-gradient-to-r from-green-400 to-blue-500 text-white'>{loading?'loading....':'Submit'}</Button>

    </div>
    {error&&<Alert className='mt-2' color={'failure'}>{error.message}</Alert>}
    
</form>

    )
}

    </div>
  )
}

export default ComentSection