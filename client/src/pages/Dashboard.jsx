import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../component/DashSidebar'
import DashProfile from '../component/DashProfile'
import DashPosts from '../component/DashPosts'
import DashUsers from '../component/DashUser'


const Dashboard = () => {
  const location=useLocation()
  const [tab,setTab]=useState()
 
  useEffect(()=>{
const searchParams=new URLSearchParams(location.search)

const tabFromUrl=searchParams.get('tab')

setTab(tabFromUrl)
  },[location.search])
  return (
    <div className='flex flex-col w-full min-h-screen md:flex-row'>
     <div>
   <DashSidebar/>
     </div>
     <div className='flex p-8 mx-auto'>
    {tab==='profile'&&<DashProfile/>}
    {tab==='posts'&&<DashPosts/>}
    {tab==='users'&&<DashUsers/>}
     </div>
    </div>
  )
}

export default Dashboard
