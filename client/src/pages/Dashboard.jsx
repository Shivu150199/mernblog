import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../component/DashSidebar'
import DashProfile from '../component/DashProfile'


const Dashboard = () => {
  const location=useLocation()
  const [tab,setTab]=useState()
  console.log(location)
  useEffect(()=>{
const searchParams=new URLSearchParams(location.search)
console.log(searchParams)
const tabFromUrl=searchParams.get('tab')
console.log(tabFromUrl)
setTab(tabFromUrl)
  },[location.search])
  return (
    <div className='flex flex-col w-full min-h-screen md:flex-row'>
     <div>
   <DashSidebar/>
     </div>
     <div className='flex items-center  p-8 m-auto'>
    {tab==='profile'&&<DashProfile/>}
     </div>
    </div>
  )
}

export default Dashboard
