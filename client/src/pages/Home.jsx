import React, { useEffect, useState } from 'react'
import CallToAction from '../component/CallToAction'
import axios from 'axios'
import PostCard from '../component/PostCard'
import NoitemFound from '../component/NoitemFound'
import { Link } from 'react-router-dom'
const codingImages = [
  "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
  "https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg",
  
 
 
 
  "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
 
  "https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg"
];
const Home = () => {
const [post,setPost]=useState([])

useEffect(()=>{
const fetchPost=async()=>{
const {data}=await axios.get(`/api/post/v1/get-post`)

setPost(data.posts)

}
fetchPost()

},[])

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
  <div className="h-96 carousel carousel-vertical rounded-box">
{codingImages.map((img,index)=>{
  return <div key={index} className="carousel-item h-full ">
  <img src={img} className='object-cover'/>
</div> 
})}

  

</div>
    <div>
      <h1 className="text-5xl font-bold">Welcome Code Crafter's</h1>
      <p className="py-6">Welcome Code Creafter's was founded by Shivam singh gautam, a passionate developer with a vision to create a hub for developers to come together and share their expertise..</p>
      <a href='https://zippy-melba-10ec8a.netlify.app/' className="btn text-white bg-gradient-to-r from-green-400 to-blue-500">Explore</a>
    </div>
  </div>
</div>

<div className='my-6 flex items-center justify-center'>
  <CallToAction/>
</div>
<div className='flex flex-col my-8 items-center justify-center'>
  <h1 className='font-bold text-4xl my-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text'>All posts</h1>

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
