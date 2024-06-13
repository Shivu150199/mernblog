import React, { useEffect, useState } from 'react'
import CallToAction from '../component/CallToAction'
import axios from 'axios'
import PostCard from '../component/PostCard'
import NoitemFound from '../component/NoitemFound'

const Home = () => {
const [post,setPost]=useState([])

useEffect(()=>{
const fetchPost=async()=>{
const {data}=await axios.get(`/api/post/v1/get-post`)
console.log(data)
setPost(data.posts)

}
fetchPost()

},[])

  return (
    <div>
   <div className="hero min-h-screen" style={{backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/002/099/443/non_2x/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-vector.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome Code Crafter's</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      {/* <button className="btn btn-primary">Get Started</button> */}
    </div>
  </div>
</div>
<div className='my-6 flex items-center justify-center'>
  <CallToAction/>
</div>
<div className='flex flex-col my-8 items-center justify-center'>
  <h1 className='font-bold text-4xl my-4'>All posts</h1>

<div className='grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 items-center justify-center '>
  
{post&&post.length>0?(
  post.map((item)=>{
    return <PostCard key={item._id} post={item}/>
  })
):(<NoitemFound/>)}


</div>
</div>




    </div>
  )
}

export default Home
