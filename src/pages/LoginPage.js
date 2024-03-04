import React, { useContext, useEffect } from 'react'
import { FaAt, FaLock } from "react-icons/fa"
import { useState } from 'react'
import axios from 'axios'
import AppContent from '../components/AppContent'
import { AuthContext } from '../context/AuthContext'


axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true

const client = axios.create({
  baseURL: "http://localhost:8000"
})


export default function LoginPage() {

  // const [action, setAction] = useState("Login")
  // const { currentUser, setCurrentUser } = useContext(AuthContext)
  // const [currentUser, setCurrentUser] = useState()
  const [registrationToggle, setRegistrationToggle] = useState(false)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { currentUser, setCurrentUser } = useContext(AuthContext)
  console.log("CURRENT USER:", currentUser)
  console.log("SET CURRENT USER:", setCurrentUser)
  console.log("TYPE SET CURRENT USER:", typeof setCurrentUser)

  useEffect(() => {
    client.get("/users/")
      .then(function (res) {
        setCurrentUser(true)
      })
      .catch(function (error) {
        setCurrentUser(false)
      })
  }, [])

  function submitLogin(e) {
    e.preventDefault()
    client.post(
      "/login/",
      {
        email: email,
        username: email,
        password: password
      }
    ).then(function (res) {
      console.log("LOGIN RESPONSE DATA ", res.data)
      setCurrentUser(res.data)
    })
  }

  function submitLogout(e) {
    e.preventDefault()
    client.post(
      "/logout/",
      { withCredentials: true }
    ).then(function (res) {
      // setCurrentUser(false)
    })
  }

  return (
    <AppContent>
      <h1>Login</h1>
      <form onSubmit={e => submitLogin(e)}>
        <div>
          <FaAt></FaAt><input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required></input>
        </div>
        <div>
          <FaLock></FaLock><input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required></input>
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
