import React from 'react'
import { FaAt, FaLock } from "react-icons/fa"
import { useState } from 'react'

import AppContent from '../components/AppContent'
import { useAuth } from '../context/AuthProvider'


export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const authContext = useAuth()

  function submitLogin(event) {
    event.preventDefault()
    authContext.authenticate({
      email: email,
      username: email,  // TODO: Check username/email validation in the Backend
      password: password
    })
  }

  function submitLogout(event) {
    event.preventDefault()
    authContext.logout()
  }

  return (
    <AppContent>
      <h1>Login</h1>
      <form onSubmit={e => submitLogin(e)}>
        <div>
          <FaAt /><input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required></input>
        </div>
        <div>
          <FaLock /><input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required></input>
        </div>
        <button type="submit">Login</button>
      </form>
      <h1>Logout</h1>
      <form onSubmit={e => submitLogout(e)}>
        <button type="submit">Logout</button>
      </form>
    </AppContent>
  )
}
