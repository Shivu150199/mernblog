import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
  
  return (
    <Link to={`/post/${post.slug}`} className="card w-96 h-[20rem] bg-base-100 shadow-xl transition-all hover:translate-y-2">
    <figure><img className='w-full h-36 object-cover' src={post.poster} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title capitalize">
       {post.title}
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p dangerouslySetInnerHTML={{ __html: post && post.content.slice(0,50) }}></p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">{post.category}</div> 
      
      </div>
    </div>
  </Link >
  )
}

export default PostCard