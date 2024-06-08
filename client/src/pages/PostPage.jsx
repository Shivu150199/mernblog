import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import CallToAction from '../component/CallToAction'
import ComentSection from '../component/ComentSection'
const PostPage = () => {
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { postSlug } = useParams()
  console.log(postSlug)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/post/v1/get-post?slug=${postSlug}`)
        console.log(res.data)
        setPost(res.data.posts[0])
        setLoading(false)
        setError(null)
      }
      catch (err) {
        setError(err)
        setLoading(false)
        console.log(err)
      }



    }
    fetchPost()

  }, [postSlug])

  console.log(post)
  if (loading) {
    return <h1 className='text-5xl'>loading.....</h1>
  }


  return (
    <main className='flex flex-col items-center max-w-6xl p-6 mx-auto'>
      <h1 className='text-5xl my-6 capitalize font-bold text-center tracking-wider'>{post && post.title}</h1>
      <img src={post && post.poster} alt="" className='my-4 max-h-60 w-full object-cover' />
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
  )
}

export default PostPage