import React from 'react'

import AppContent from '../components/AppContent'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'

export default function ProfilePage() {

  const authContext = useAuth()

  if (authContext.loading) {
    return <AppContent><LoadingSpinner /></AppContent>
  }

  if (!authContext.user) {
    return <Navigate to="/login/" />
  }

  return (
    <AppContent>
      <h1>Profile</h1>
      <h4>My information</h4>
      <p>username: {authContext.user.username}</p>
      <p>display_name: {authContext.user.display_name}</p>
      <p>first_name: {authContext.user.first_name}</p>
      <p>last_name: {authContext.user.last_name}</p>
      <p>email: {authContext.user.email}</p>
      <Link to="/profile/edit" >Edit</Link>
    </AppContent>
  )
}
