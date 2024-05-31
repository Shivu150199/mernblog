import { Avatar, Dropdown, Navbar, NavbarLink, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Badge } from 'flowbite-react'
import { CiSearch} from 'react-icons/ci'
import { IoIosMoon } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../redux/authSlice'


const Header = () => {
  const leChalo=useNavigate()
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.authState)
  // const h=useSelector(state=>state.authState)
  // console.log(user.data.photo)
  // console.log(h)
  const logout=()=>{
      dispatch(handleLogout())
      leChalo('/sign-in')
  }
  const path=useLocation()
  return (
    <Navbar fluid rounded>
      <Link to="/" className="flex gap-1 items-center font-bold">
        <Badge className="p-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded ">
          MERN
        </Badge>{' '}
        Blog
      </Link>
      <form className="w-10 md:w-[15rem]">
        <TextInput
          type="text"
          placeholder="search... "
          rightIcon={CiSearch}
          // rightIcon={<CiSearch />}
        />
      </form>
      <Navbar.Collapse>
        {/* <Link to="/" >Home</Link>
       
      */}

        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/project'} as={'div'}>
          <Link to="/project">Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <div className="flex items-center gap-2">
        <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold  py-2 px-4 border rounded hover:shadow-xl hover:scale-105 transition-all">
          <IoIosMoon />
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.data.photo}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={logout}>
            <button>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 border hover:border-transparent rounded"
            to="/sign-in"
          >
            Login
          </Link>
        )}
        <div className="flex md:order-2">
          <Navbar.Toggle />
        </div>
        {/*  */}

        {/*  */}
      </div>
    </Navbar>
  )
}

export default Header
