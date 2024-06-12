import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Comment from './Comment'

const ComentSection = ({ postId }) => {
    const [comment, setCommnet] = useState('')
    const [showModel,setShowModel]=useState(false)
    const [commentToDelete,setCommentToDelete]=useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [commentList, setCommentList] = useState([])
    const { user } = useSelector(state => state.authState)
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (comment.length > 200) {
            return;
        }

        try {
            setLoading(true)
            const res = await axios.post('/api/comment/v1/create-comment', { content: comment, postId, userId: user.data._id })
            console.log('comment ', res)
            setLoading(false)
            setError(null)
            setCommnet('')
        }
        catch (err) {
            console.log(err)
            setError(err)
            setLoading(false)
            setCommnet('')
        }


    }
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await axios.get(`/api/comment/v1/get-comment/${postId}`)
          
                setCommentList(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getComments()
    }, [postId])


const handleLike=async(commentId)=>{
try{
if(!user){
    navigate('/sign-in')
    return;
}
const {data}=await axios.put(`/api/comment/v1/like-comment/${commentId}`)
console.log(data)
setCommentList(commentList.map((item)=>{
    return (item._id==commentId)?{
        ...item,likes:data.likes,
        numberOfLikes:data.likes.length
    }:item
}))



}catch(err){
    console.log(err)
}


}

console.log(commentList)

const handleCommentEdit=(commentss,editedComment)=>{
setCommentList(commentList.map((c)=>{
    return c._id==commentss._id?{...c,content:editedComment}:c
}))
}
const handleCommentDelete=async()=>{
    console.log('hello')
try{
const res=await axios.delete(`/api/comment/v1/delete-comment/${commentToDelete}`)
console.log(res)
if(res.status==200){
  
   
            setCommentList(commentList.filter((item)=>item._id!==commentToDelete))
    

}


}catch(err){
    console.log(err)
}

}

    return (
        <div className='w-80 md:w-[30rem]'>
            {user ? (<div className='flex gap-2 my-4 items-center'>
                <p className='text-[1rem] font-bold'>Signed in as :</p>
                <img className='w-5 h-5 object-cover rounded-full ' src={user.data.photo} alt="" />
                <Link to='/dashboard?tab=profile'>
                    <span className='text-cyan-500 hover:underline'>@{user.data.username}</span>
                </Link>

            </div>) : (
                <div>


                    <Link className='btn bg-gradient-to-r from-green-400 to-blue-500 text-white mx-auto' to='sign-in'>
                        Go to sign in page
                    </Link>
                </div>
            )}

            {
                user && (
                    <form onSubmit={handleSubmit} className='w-full p-4 rounded border border-teal-600'>
                        <Textarea value={comment} placeholder='Add a comment' rows='3' maxLength='200' className='w-full' onChange={(e) => setCommnet(e.target.value)} />
                        <div className='flex justify-between my-2 items-center'>
                            <p className='text-xs'>{200 - comment.length} characters remaining</p>
                            <Button type='submit' outline className='bg-gradient-to-r from-green-400 to-blue-500 text-white'>{loading ? 'loading....' : 'Submit'}</Button>

                        </div>
                        {error && <Alert className='mt-2' color={'failure'}>{error.message}</Alert>}

                    </form>

                )
            }
            {commentList === 0 ? (
                <p className='text-sm my-5'>No comments</p>
            ) : (<>
                <div className='my-5 flex gap-4 items-center'>
                    <p className='text-sm capitalize'>comments</p>
                    <div className='border border-slate-700 flex items-center justify-center w-5 h-5 rounded'>
                        <p className='text-sm '>{commentList.length}</p>
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                {commentList.map((item) => {
                    return <Comment handleCommentDelete={handleCommentDelete} onDelete={(commentId)=>{
                        setShowModel(true)
                        setCommentToDelete(commentId)
                    }} onEdit={handleCommentEdit} key={item._id} comment={item} onLike={handleLike}/>
                })}
                    </div>

            </>



            )}
        </div>
    )
}

export default ComentSection