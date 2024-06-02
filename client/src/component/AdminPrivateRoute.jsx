import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const AdminPrivateRoute = () => {
    const { user } = useSelector((state) => state.authState)
    console.log(user)
    return <>{user&&user.data.isAdmin ? <Outlet /> : <Navigate to="sign-in" />}</>
}

export default AdminPrivateRoute