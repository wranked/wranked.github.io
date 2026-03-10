import React, { useState, useEffect } from 'react'
import { FaAt, FaLock, FaUser } from 'react-icons/fa'
import Card from 'shared/ui/Card'
import GoBack from 'shared/ui/GoBack'

import AppContent from 'shared/layout/AppContent'
import { useAuth } from 'features/auth'
import { useApiClient } from 'context/ApiClient'
import { Nav } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from 'shared/ui/LoadingSpinner'



export default function ProfileEditPage() {
  
  const authContext = useAuth()
  const client = useApiClient()

  const [username, setUsername] = useState("")
  const [displayname, setDisplayname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [picture, setPicture] = useState("")
  const [error, setError] = useState(null)

  useEffect(function () {
    if (authContext.user) {
      setUsername(authContext.user.username || "")
      setDisplayname(authContext.user.display_name || "")
      setFirstname(authContext.user.first_name || "")
      setLastname(authContext.user.last_name || "")
      setEmail(authContext.user.email || "")
      setPicture(authContext.user.picture || "")
    }
  }, [authContext.user])


  function submitChange(event) {
    event.preventDefault()
    client
      .patch("/users/",
        {
          "username": username,
          "display_name": displayname,
          "first_name": firstname,
          "last_name": lastname,
          "email": email,
          // "password": password,
          "picture": `https://i.pravatar.cc/150?u=${email}`,
        },{
        headers: { Authorization: `Token ${authContext.token}`
        }} 
      )
      .then(function (res) {

      })
      .catch(function (err) {
        setError(err)
      })
  }

  if (authContext.loading) {
    return <AppContent><LoadingSpinner /></AppContent>
  }

  if (!authContext.user) {
    return <Navigate to="/login/" />
  }

  return (
    <AppContent>
      <h1>Profile Edit</h1>
      <Card>
        <form onSubmit={e => submitChange(e)}>
          <FaUser /><input type="name" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br />
          <FaUser /><input type="name" placeholder="Display name" value={displayname} onChange={e => setDisplayname(e.target.value)} /><br />
          <FaUser /><input type="name" placeholder="First name" value={firstname} onChange={e => setFirstname(e.target.value)} /><br />
          <FaUser /><input type="name" placeholder="Last name" value={lastname} onChange={e => setLastname(e.target.value)} /><br />
          <FaAt /><input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
          {/* <FaLock /><input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br />
          <FaLock /><input type="password" placeholder="Repeat password" onChange={e => setPassword2(e.target.value)} required /><br /> */}
          <button type="submit">Save Changes</button>
        </form>
      <GoBack />
      </Card>

    </AppContent>
  )
}
