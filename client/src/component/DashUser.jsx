import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

import { FaCheck,FaTimes } from "react-icons/fa";
const DashUsers = () => {
    const [showModel, setShowModel] = useState(false)
    const { user } = useSelector(state => state.authState)
    const [userList, setUserList] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [userIdDelete, setUserDelete] = useState('')
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/api/auth/v1/get-user`)
              
                setUserList(res.data.data)
                if (res.data.data.length < 9) {
                    setShowMore(false)
                }
            } catch (err) {
                console.log(err)
            }

        }
        if (user.data.isAdmin) {

            fetchPosts()
        }
    }, [user.data._id])
    const handleDelete = async (e) => {
        e.stopPropagation()

        try {

            const res = await axios.delete(`/api/auth/v1/delete/${userIdDelete}`)
            if (res.status === 204) {
                setUserList(prev => prev.filter(items => items._id !== userIdDelete))
            }
        }
        catch (err) {
            console.log(err)
        }



    }



    const handleShowMore = async () => {
        let startIndex = postList.length
        try {
            const res = await axios.get(`/api/auth/v1/get-user?startIndex=${startIndex}`)

            if (res.data.data.length < 9) {
                setShowMore(false)
            }
            if (res.statusText === 'OK') {
                setUserList((prev) => [...prev, ...res.data.data])
            }


        } catch (err) {
            console.log(err)
        }
    }
    const handleClick = (id) => {
        setUserDelete(id)
        setShowModel(true)
    }
    

    return (<div>

        {user.data.isAdmin && userList.length > 0 ? (
            <>
                <Table hoverable className='shadow-md w-full'>
                    <Table.Head>
                        <Table.HeadCell>
                            Date created
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Userimage
                        </Table.HeadCell>
                        <Table.HeadCell>
                            User Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Admin
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Delete
                        </Table.HeadCell>

                    </Table.Head>
                    {
                        userList.map((item, index) => {
                         
                            return <Table.Body key={index}>
                                <Table.Row>
                                    <Table.Cell>{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <img src={item.photo} alt={item.name} className='w-10 h-10 rounded-full object-cover bg-gray-400' />
                                    </Table.Cell>
                                    <Table.Cell>


                                        <p className='text-xl font-medium capitalize hover:text-sky-500'>{item.email}</p>

                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{item.isAdmin ? (<FaCheck className='text-green-500'/>) : <FaTimes className='text-rose-500'/>}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div onClick={()=>handleClick(item._id)} className='btn'><DeleteModal heading='user account' btnText='Delete' onClose={handleDelete} /></div>
                                    </Table.Cell>

                                </Table.Row>
                            </Table.Body>
                        })
                    }

                </Table>
                {showMore &&
                    <div className='flex items-center'>

                        <button className='btn mx-auto mt-6' onClick={handleShowMore}>
                            show more
                        </button>
                    </div>
                }
            </>
        ) : <p>No item found</p>}
    </div>
    )
}

export default DashUsers