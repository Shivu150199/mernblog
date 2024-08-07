import { nanoid, unwrapResult } from '@reduxjs/toolkit'
import axios from 'axios'
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'
import { getAllPost } from '../redux/postSlice'

const DashPosts = () => {
  const [showModel,setShowModel]=useState(false)
  const dispatch=useDispatch()
  const { user } = useSelector(state => state.authState)
  const { postList ,showMore} = useSelector(state => state.postState)
  
 
  // const [showMore,setShowMore]=useState(true)
  const [postIdDelete,setPostIdDelete]=useState('')
  useEffect(() => {
    const fetchPosts = async () => {
      try {
       let resultAction=await dispatch(getAllPost(user._id))
        unwrapResult(resultAction)

      } catch (err) {
        console.log(err)
      }

    }
    if (user.isAdmin) {

      fetchPosts()
    }
  }, [user._id])

const handleDelete=async()=>{

  try{

    const res=await axios.delete(`/api/post/v1/deletePost/${postIdDelete}/${user._id}`)
    if(res.status===204){
      // setPostList(prev=>prev.filter(items=>items._id!==postIdDelete))
      }
  }
  catch(err){
    console.log(err)
  }
 


}
const handleShowMore=async()=>{
  let startIndex=postList.length
  try{
const res=await axios.get(`/api/post/v1/get-post?userId=${user._id}&startIndex=${startIndex}`)

if(res.data.posts.length<9){
  setShowMore(false)
}
if(res.statusText==='OK'){
  // setPostList((prev)=>[...prev,...res.data.posts])
}


  }catch(err){
    console.log(err)
  }
}

const handleClick = (id) => {
  setPostIdDelete(id)
  setShowModel(true)
}

  return (<div>

    {user.isAdmin && postList.length > 0 ? (
      <>
        <Table hoverable className='shadow-md w-full'>
          <Table.Head>
            <Table.HeadCell>
              Date updated
            </Table.HeadCell>
            <Table.HeadCell>
              Post image
            </Table.HeadCell>
            <Table.HeadCell>
              Post Title
            </Table.HeadCell>
            <Table.HeadCell>
              Category
            </Table.HeadCell>
            <Table.HeadCell>
              Delete
            </Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {
            postList.map((item,index) => {
            return  <Table.Body key={index}>
                <Table.Row>
                  <Table.Cell>{new Date(item.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell><Link to={`/post/${item.slug}`}>
                  <img src={item.poster} alt={item.title}  className='w-20 h-10 object-cover bg-gray-400'/> 
                  </Link></Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${item.slug}`}>
                    
                    <p className='text-xl font-medium capitalize hover:text-sky-500'>{item.title}</p>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{item.category}</p>
                  </Table.Cell>
                  <Table.Cell>
                   <div onClick={()=>handleClick(item._id)} className='btn'><DeleteModal btnText='Delete' onClose={handleDelete} heading='Post'/></div>
                  </Table.Cell>
                  <Table.Cell>
                   <Link to={`/update-post/${item._id}`} className='btn'>Edit</Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            })
          }

        </Table>
        {showMore&&
        <div className='flex items-center'>

        <button className='btn mx-auto mt-6' onClick={handleShowMore}>
          show more
          </button>
        </div>
          }
      </>
    ) : <p>No item found</p>}
  </div>
  )
}

export default DashPosts