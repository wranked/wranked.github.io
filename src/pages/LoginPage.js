import React from 'react'
import { FaAt, FaLock } from "react-icons/fa"
import { useState, useEffect } from 'react'

import AppContent from '../components/AppContent'
import { useAuth } from '../context/AuthProvider'
import { Link, Navigate, useNavigate } from 'react-router-dom'


export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const authContext = useAuth()
  const navigate = useNavigate()

  async function submitLogin(event) {
    event.preventDefault()
    const user = await authContext.authenticate({
      email: email,
      // username: email,  // TODO: Check username/email validation in the Backend
      password: password
    })
    if (user) {
      setRedirect(true)
    }
  }

  useEffect(function () {
    if (authContext.user) {
      setRedirect(true);
    }
  }, [authContext.user]);

  if (redirect) {
    navigate(-1)
  }

  return (
    <AppContent>
      <h1>Sign in</h1>
      <form onSubmit={e => submitLogin(e)}>
        <div>
          <FaAt /><input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required></input>
        </div>
        <div>
          <FaLock /><input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required></input>
        </div>
        <span>Forgot password?</span>
        <button type="submit">Login</button>
      </form>
    </AppContent>
  )
}
