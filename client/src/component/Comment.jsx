import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Comment = ({ comment, onLike }) => {
    const {user}=useSelector(state=>state.authState)
    const [users, setUser] = useState({})
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
console.log(user.data._id)
console.log(comment.likes)
    return (
        <div className='flex items-center gap-4 border-b-slate-200 border-b pb-2'>
            <div>
                <img className='w-8 h-8 rounded-full object-cover' src={users.photo} alt="" />
            </div>
            <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-4 justify-between w-[100%]'>
                    <span className='font-bold truncate'>@{users ? users.username : 'anonymous'}</span>
                    <span className='text-slate-400 text-sm'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                <p className='text-xl text-slate-500'>{comment.content}</p>
                <div className='flex gap-2'>
                    <button onClick={() => onLike(comment._id)}><FaThumbsUp className={`text-slate-400 hover:text-blue-500 ${user&&comment.likes.includes(user.data._id)&&'!text-blue-500' }`}/></button>
                    <p className='text-slate-500 text-sm'>
                        {
                            comment.numberOfLikes>0&&comment.numberOfLikes+" "+(comment.numberOfLikes===1?"like":'likes')
                        }
                    </p>
                </div>
            </div>



        </div>
    )
}

export default Comment