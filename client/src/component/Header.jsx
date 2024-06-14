import {  Navbar, NavbarLink, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Badge } from 'flowbite-react'
import { CiSearch} from 'react-icons/ci'
import { IoIosMoon } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../redux/authSlice'
import axios from 'axios'

const Header = () => {
  const leChalo=useNavigate()
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.authState)
  const [searchTerm,setSearchTerm]=useState('')

  const logout=async()=>{
    let res=await axios.post('/api/auth/v1/signout')

      dispatch(handleLogout())
      leChalo('/sign-in')
  }
  const path=useLocation()
  useEffect(()=>{
    const urlParams=new URLSearchParams(path.search)
    const searchTermFromURL=urlParams.get('searchTerm')
    if(searchTermFromURL){

      setSearchTerm(searchTermFromURL)
    }

  },[path.search])


const handleSubmit=(e)=>{
e.preventDefault()
const urlParams=new URLSearchParams(path.search)
urlParams.set('searchTerm',searchTerm)
const searchQuery=urlParams.toString();
leChalo(`/search?${searchQuery}`)


}
  return (
    <Navbar fluid rounded>
      <Link to="/" className="flex gap-1 items-center font-bold">
        <Badge className="p-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded text-xl">
          CODE
        </Badge>{' '}
        CRAFTER
      </Link>
      <form onSubmit={handleSubmit} className="w-10 md:w-[15rem]">
        <TextInput
          type="text"
          placeholder="search... "
          rightIcon={CiSearch}
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
         
        />
      </form>
      <Navbar.Collapse>
   

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
                  src={user&&user.data.photo}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to='/dashboard?tab=profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
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
      
      </div>
    </Navbar>
  )
}

export default Header
