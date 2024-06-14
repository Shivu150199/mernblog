import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import CallToAction from '../component/CallToAction'
import ComentSection from '../component/ComentSection'
import NoitemFound from '../component/NoitemFound'
import PostCard from '../component/PostCard'
const PostPage = () => {
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recentPost,setRecentPost]=useState(null)
  const { postSlug } = useParams()
 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/post/v1/get-post?slug=${postSlug}`)
    
        setPost(res.data.posts[0])
        setLoading(false)
        setError(null)
      }
      catch (err) {
        setError(err)
        setLoading(false)
  
      }



    }
    fetchPost()
    const fetchRecentPost=async()=>{
      try{
  const{data}=await axios.get(`/api/post/v1/get-post?limit=3`)

  setRecentPost(data.posts)
      }catch(err){
  console.log(err)
      }
    }
  fetchRecentPost()

  }, [postSlug])


  if (loading) {
    return <h1 className='text-5xl'>loading.....</h1>
  }
  


  return (<>
    <main className='flex flex-col items-center max-w-6xl p-6 mx-auto'>
      <h1 className='text-5xl my-6 capitalize font-bold text-center tracking-wider bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text'>{post && post.title}</h1>
      <img src={post && post.poster} alt="" className='my-4 max-h-60 w-full object-cover rounded-lg shadow-lg' />
      <div className='flex justify-between w-full items-center  py-4 border-b border-slate-500'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <Link to={`/search?category=${post&&post.category}`} className='my-6'>

        <div className='badge badge-outline capitalize'>{post && post.category}</div>
      </Link>

      <div className='text-xl p-4 mx-auto w-full post-content text-wrap overflow-hidden' dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
<div className='max-w-4xl mx-auto w-full'>
  <CallToAction/> 
</div>
<div className='commentSection'>
<ComentSection postId={post&&post._id}/>
</div>

    </main>


    <div className='flex flex-col justify-center items-center my-6'>
  <h1 className='font-medium text-xl'>Recent Articles</h1>
  <div className='grid gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3'>

{recentPost&&recentPost.length>0?(
  recentPost.map((item)=>{
    return <PostCard key={item._id} post={item}/>
    })
    ):(
   <NoitemFound/>
)}
</div>

</div>
</>


  )
}

export default PostPage