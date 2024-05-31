import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { handleLogout } from '../redux/authSlice'
const DashSidebar = () => {
    const dispatch=useDispatch()
   const leChalo= useNavigate()
  const location = useLocation()
  const [tab, setTab] = useState()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
   
    const tabFromUrl = searchParams.get('tab')

    setTab(tabFromUrl)
  }, [location.search])
  const signout = () => {
  dispatch(handleLogout())
  leChalo('/sign-in')
  }
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'>
          <Sidebar.Item
            icon={HiUser}
            active={tab == 'profile'}
            label={'User'}
            labelColor={'dark'}
            >
            Profile
          </Sidebar.Item>
              </Link>
              
          <Sidebar.Item onClick={signout} icon={HiArrowSmRight}>Sign out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
