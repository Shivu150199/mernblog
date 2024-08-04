import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { isAuthenticated} = useSelector((state) => state.authState)
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="sign-in" />}</>
}

export default PrivateRoute
