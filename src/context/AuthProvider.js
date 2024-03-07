import { createContext, useContext, useState } from 'react'

import { useApiClient } from './ApiClient'


const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const client = useApiClient()

  async function authenticate(credentials) {
    client.post("/login/",
      credentials
    ).then(function (res) {
      setUser(res.data)
    }
    ).catch(function (err) {
      setError(err)
    })
  }

  async function logout() {
    client.post("/logout/",
      { withCredentials: true }
    ).then(function (res) {
      setUser(null)
    }
    ).catch(function (err) {
      setError(err)
    })
  }

  async function checkUser() {
    client.get("/users/")
      .then(function (res) {
        setUser(res.data.user)
      })
      .catch(function (error) {
        setUser(null)
      })
  }

  return (
    <AuthContext.Provider value={{ user, error, setUser, authenticate, logout, checkUser }}>
      {props.children}
    </AuthContext.Provider>)
}
