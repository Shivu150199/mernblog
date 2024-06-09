import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
const Comment = ({ comment }) => {
   const [user,setUser]=useState({})
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/api/auth/v1/${comment.userId}`)
                console.log(res.data)
                setUser(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()

    }, [comment])


    return (
        <div className='flex items-center gap-4 border-b-slate-200 border-b pb-2'>
            <div>
                <img className='w-8 h-8 rounded-full object-cover' src={user.photo} alt="" />
            </div>
            <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-4 justify-between w-[100%]'>
                <span className='font-bold truncate'>@{user?user.username:'anonymous'}</span>
                <span className='text-slate-400 text-sm'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-xl text-slate-500'>{comment.content}</p>
         
            </div>
        
        </div>
    )
}

export default Comment