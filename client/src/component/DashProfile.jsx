import { Label, TextInput, Toast } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import axios from 'axios'
import { app } from '../firebase'
import { toast } from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import {
  
  deleteUserPending,
  deleteUserRejected,
  deleteUserSuccess,
  handleLogout,
  updatePending,
  updateRejected,
  updateSuccess,
} from '../redux/authSlice'
import DeleteModal from './DeleteModal'

const DashProfile = () => {
  const { user, loading, error } = useSelector((state) => state.authState)
  // console.log(user)
  const fileRef = useRef()
  const [showModel,setShowModel]=useState(false)
const navigate=useNavigate()
  const [imageFile, setImageFile] = useState(null)
  const [imageFileURL, setImageFileURL] = useState(null)
  const [imageProgress, setImageProgress] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(null)
  const [formData, setFormData] = useState(null)

  const dispatch = useDispatch()
  // console.log(user)
  

  const handleSubmit=async(e)=>{
e.preventDefault()

 try{
  dispatch(updatePending())
const res=await fetch('/api/auth/v1/update/'+user.data._id,{
  method:'PUT',
  headers:{
    'Content-Type':'application/json',
  },
  body:JSON.stringify(formData)
})
 const data=await res.json()
 
 dispatch(updateSuccess(data))
 }catch(err){
  console.log(err)
  dispatch(updateRejected(err))
 }  



  }
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleImageChange = (e) => {
    let file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImageFileURL(URL.createObjectURL(file))
    }
  }
  //   rules_version = '2';

  // // Craft rules based on data in your Firestore database
  // // allow write: if firestore.get(
  // //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //       request.resource.size < 2 *1024 *1024 &&
  //       request.resource.contentType.matches('image/.*')
  //     }
  //   }
  // }

  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const uploadImage = () => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageProgress(progress.toFixed(0))
      },
      (error) => {
        setFileUploadError('could not upload (file should beless than 2m b)')
        toast('could not upload (file should beless than 2m b)')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageFileURL(url)
          setFormData({ ...formData, photo: url })
        })
      }
    )
  }
  console.log(user)
  console.log(formData)
  const handleDelete=async(e)=>{
e.preventDefault()
dispatch(deleteUserPending())
    try{
      const res=await axios.delete('/api/auth/v1/delete/'+user.data._id)
      console.log(res)
      dispatch(deleteUserSuccess())
      navigate('/sing-in')

    }catch(err){
console.log(err)
dispatch(deleteUserRejected(err))
    }


  }
  console.log(showModel)
  const handleSignout=()=>{
    dispatch(handleLogout())
  }
  return (
    <>
    <form
      className="shadow p-4 rounded flex items-center justify-center flex-col w-80"
      onSubmit={handleSubmit}
      >
      <h1 className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-xl font-bold text-center">
        Profile
      </h1>
      <div className="flex items-center justify-center relative">
        <p className="absolute top-2 left-2 text-white">{imageProgress} %</p>
        <img
          src={imageFileURL || user.data.photo}
          alt="profile"
          className="w-[3rem] h-[3rem] object-cover rounded"
          onClick={() => fileRef.current.click()}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileRef}
          hidden
        />
      </div>
      <div className="w-full">
        <Label value="Username" />
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          defaultValue={user.data.username}
          />
      </div>
      <div className="w-full">
        <Label value="Email" />
        <TextInput
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          defaultValue={user.data.email}
          />
      </div>
      <div className="w-full">
        <Label value="Password" />
        <TextInput
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white hover:bg-blue-500 mt-4 w-full"
        >
        {loading ? <span className="loading">loading</span> : 'Update Profile'}
      </button>
      {
        user.data.isAdmin&&(
          <Link to='/create-post' className='w-full'>
          <button type='button'  className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white hover:bg-blue-500 mt-4 w-full">Create a post</button>
          </Link>
        )
      }
      <div className='flex w-full justify-between mt-4 '>
        {/* <button type='button' onClick={()=>setShowModel(true)} className='capitalize text-sky-500 hover:text-sky-700'>delete user</button> */}
      <DeleteModal onClose={handleDelete} btnText='Delete user'/>
        <button type='button' onClick={handleSignout} className='capitalize text-sky-500 hover:text-sky-700'>log out user</button>
      </div>

      {/* <p className="text-red-700 text-xs">{error&&error.message}</p> */}
    </form>
    {/* {
      showModel&&<DeleteModal/>
    } */}
      </>
  )
}

export default DashProfile
