import { Avatar, Dropdown, Navbar, NavbarLink, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from 'flowbite-react'
import { CiSearch} from 'react-icons/ci'
import { IoIosMoon } from "react-icons/io";


const Header = () => {
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

      <Link
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        to="/sign-in"
      >
        Login
      </Link>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        <IoIosMoon />
      </button>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
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
    </Navbar>
  )
}

export default Header
