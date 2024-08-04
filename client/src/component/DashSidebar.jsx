import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiArrowSmRight, HiUser ,HiDocumentText,HiOutlineUserGroup} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../redux/authSlice'
const DashSidebar = () => {
  const {user}=useSelector(state=>state.authState)

  const dispatch = useDispatch()
  const leChalo = useNavigate()
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
              label={user.isAdmin?'Admin':'User'}
              labelColor={'dark'}
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {user.isAdmin&& <Link to='/dashboard?tab=posts'>
            <Sidebar.Item
              icon={HiDocumentText}
             
             active={tab==='posts'}
             as='div'
          
            >
              Posts
            </Sidebar.Item>
          </Link>
          }
          {user.isAdmin&& <Link to='/dashboard?tab=users'>
            <Sidebar.Item
              icon={HiOutlineUserGroup}
             
             active={tab==='users'}
             as='div'
          
            >
              Users
            </Sidebar.Item>
          </Link>
          }
     

          <Sidebar.Item onClick={signout} icon={HiArrowSmRight}>Sign out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
