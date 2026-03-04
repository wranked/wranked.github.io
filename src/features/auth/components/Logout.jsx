import React, { useEffect, useState } from 'react'

import { useAuth } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'


export default function Logout() {

  const authContext = useAuth()
  const [loggedOut, setLoggedOut] = useState(false)

  useEffect(() => {
    async function handleLogout() {
      await authContext.logout()
      setLoggedOut(true)
    }
    handleLogout()
  }, [])

  if (loggedOut) {
    return <Navigate to="/" />
  }

  return <p>Logging out...</p>
}
