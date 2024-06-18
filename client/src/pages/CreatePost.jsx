import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { app } from '../firebase';
import { createPostFail, createPostPending, createPostSuccess } from '../redux/postSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const{loading,error}=useSelector(state=>state.postState)
    const [imgFile, setImgFiles] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)
    const [imageProgress, setImageProgress] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(null)
    const [formData,setFormData]=useState(null)
    // const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const handleImageChange = (e) => {
        let file = e.target.files[0]
        if (file) {
            setImgFiles(file)
       
        }
    }
    // useEffect(() => {
    //     if (files) {
    //         uploadImage()
    //     }
    // }, [files])

    const uploadImage = async() => {
        try{

            const storage = getStorage(app)
            const fileName = new Date().getTime() + imgFile.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, imgFile)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageProgress(progress.toFixed(0))
                
            },
            (error) => {
                setFileUploadError('could not upload (file should beless than 2m b)')
                toast('could not upload (file should beless than 2m b)')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setFileUrl(url)
                    setFormData({...formData,poster:url})
                })
            }
            
        )
    
    }catch(err){
console.log(err)
    }
        
    }
    console.log(formData)
    console.log(imageProgress)
    const handleUpload=()=>{
        uploadImage()
    }
const handleChange=(e)=>{
setFormData({...formData,[e.target.id]:e.target.value})
}
const handleSubmit=async(e)=>{
    console.log('hello')
e.preventDefault()
try{
    createPostPending()
const res=await axios.post('/api/post/v1/create',formData)
console.log(res.data)
createPostSuccess(res.data)
navigate(`/post/${res.data.data.slug}`)
}catch(err){
    console.log(err)
createPostFail(err)
}

}

    return (
        <div className='p-3 min-h-screen max-w-3xl mx-auto gap-4'>
            <h2 className='text-center text-3xl font-bold text-slate-700 tracking-wider mb-4'>Create Post</h2>
            <form className='flex flex-col gap-4' >
                <div className='flex flex-col md:flex-row md:justify-between gap-4 '>
                    <TextInput type='text' placeholder='Title required' className='w-full' onChange={handleChange} id='title' />
                    <Select onChange={handleChange} id='category'>
                        <option value="uncategorised">Select a category</option>
                        <option value="javascript">Javascript</option>
                        <option value="c++">c++</option>
                        <option value="python">Python</option>
                        <option value="html">Html</option>
                        <option value="css">Css</option>
                        <option value="reactjs">React JS</option>
                        <option value="typeScript">TypeScript</option>
                    </Select>

                </div>


            </form>
            <div className='flex justify-between mt-4 p-4 border-2 border-dashed border-sky-800 items-center gap-6'>
                <FileInput accept='image/*' type='file' className='w-full' onChange={handleImageChange} />
                <button className='btn btn-primary' onClick={handleUpload}>upload image</button>

            </div>
            <img src={fileUrl} alt="" />
            <div className='mt-6'>
                <ReactQuill theme="snow" placeholder='Write something' className='h-72 mb-4' required onChange={(value)=>setFormData({...formData,content:value})} id='content' />
                <Button onClick={handleSubmit} type='submit' className='btn w-full mt-20'>{loading?<span className='spinner'>loading</span>:"Publish"}</Button>
            </div>


        </div>
    )
}

export default CreatePost