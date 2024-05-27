import { Label, TextInput, Toast } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

import {app} from '../firebase'
import { toast } from 'react-toastify'
const DashProfile = () => {
  const  {user}= useSelector((state) => state.authState)
  const fileRef=useRef()
  const [imageFile,setImageFile]=useState(null)
  const [imageFileURL,setImageFileURL]=useState(null)
  const [imageProgress ,setImageProgress]=useState(0)
const [fileUploadError,setFileUploadError]=useState(null)



  console.log(user)
  const handleSubmit = () => {}
  const handleChange = () => {}
  const loading = false
  const error = false
  const handleImageChange=(e)=>{
    let file=e.target.files[0]
    if(file){

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
  console.log(imageFile)
  console.log(imageFileURL)
useEffect(()=>{
  if(imageFile){
    uploadImage()
  }
},[imageFile])

const uploadImage = ()=>{
const storage=getStorage(app)
const fileName=new Date().getTime()+imageFile.name
const storageRef=ref(storage,fileName)
const uploadTask=uploadBytesResumable(storageRef,imageFile)
uploadTask.on('state_changed',(snapshot)=>{
  const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
setImageProgress(progress.toFixed(0))


},
(error)=>{
setFileUploadError('could not upload (file should beless than 2m b)')
toast('could not upload (file should beless than 2m b)')
},
()=>{
  getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
    setImageFileURL(url)
  })
}
)

}
console.log(imageProgress,fileUploadError,imageFileURL)
  return (
    <form
      className="shadow p-4 rounded flex items-center justify-center flex-col w-80"
      onSubmit={handleSubmit}
    >
      <h1 className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-xl font-bold text-center">
        Profile
      </h1>
      <div className='flex items-center justify-center relative'>
        <p className='absolute top-2 left-2 text-white'>{imageProgress} %</p>
        <img src={imageFileURL||user.data.photo} alt="profile" className='w-[3rem] h-[3rem] object-cover rounded' onClick={()=>fileRef.current.click()}/>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={fileRef} hidden/>
      </div>
      <div className="w-full">
        <Label value="Email" />
        <TextInput
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
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
        tyep="submit"
        className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white hover:bg-blue-500 mt-4 w-full"
      >
        {loading ? <span className="loading">loading</span> : 'Update Profile'}
      </button>

      {/* <p className="text-red-700 text-xs">{error&&error.message}</p> */}
    </form>
  )
}

export default DashProfile
