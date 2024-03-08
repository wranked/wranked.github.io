import React, { useEffect } from 'react'

import { useAuth } from '../context/AuthProvider'
import { Link, Navigate } from 'react-router-dom'


export default function Logout() {

  console.log("LOGOUT!")
  const authContext = useAuth()

  // useEffect(function() {
  authContext.logout()
  // }, [])

  return (
    <Navigate to="/" />
  )
}
