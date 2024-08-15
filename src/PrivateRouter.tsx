import React from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouter  { 
    children: React.ReactNode
 }

function PrivateRouter(props: PrivateRouter) {
  if (localStorage.getItem('token') == null){
    return <Navigate to='/signin' />
  } else return props?.children
}

export default PrivateRouter
