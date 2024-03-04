import React, { useContext } from 'react'
import AppContent from '../components/AppContent'
import { AuthContext } from '../context/AuthContext'


export default function ProfilePage() {
  // const { currentUser, setCurrentUser } = useContext(AuthContext)
  // console.log(currentUser)

  return (
    <AppContent>
      <h1>Profile</h1>
      <h4>My information</h4>
      {/* <p>{currentUser}</p> */}
    </AppContent>
  )
}
