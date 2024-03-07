import React from 'react'

import AppContent from '../components/AppContent'
import { useAuth } from '../context/AuthProvider'


export default function ProfilePage() {

  const authContext = useAuth()

  return (
    <AppContent>
      <h1>Profile</h1>
      <h4>My information</h4>
      <p>{authContext.user.email}</p>
    </AppContent>
  )
}
