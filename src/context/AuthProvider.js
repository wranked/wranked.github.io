import { createContext, useContext, useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom"
import { useApiClient } from './ApiClient'


const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [companies, setCompanies] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // const navigate = useNavigate()
  const client = useApiClient()

  useEffect(function () {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("api_token")
      if (storedToken) {
        setToken(storedToken)
        // checkUser(storedToken)
      }
    }
  }, [localStorage])

  useEffect(function () {
    if (token) {
      checkUser()
    }
  }, [token])

  async function authenticate(credentials) {
    try {
      const res = await client.post("/login/", credentials)
      const { token, user } = res.data
      setUser(user)
      setToken(token)
      localStorage.setItem("api_token", token)
      // await checkUser()
      return res.data
    }
    catch (err) {
      setError(err)
      return null
    }
  }

  async function checkUser() {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const user_res = await client.get("/users/", {
        headers: { Authorization: `Token ${token}` }
      })
      if (user_res.status === 401) {
        console.error("Invalid Token")
      }
      setUser(user_res.data.user)

      const company_res = await client.get("/companies/me/", {
        headers: { Authorization: `Token ${token}` }
      })
      if (company_res.status === 401) {
        console.error("Invalid Token")
      }
      setCompanies(company_res.data.results)
    }
    catch (err) {
      setError(err)
      setUser(null)
      setCompanies(null)
      return null
    }
    setLoading(false)
  }

  async function logout() {
    try {
      const res = await client.post("/logout/", {}, {
        headers: { Authorization: `Token ${token}`,
        "Content-Type": "application/json",
        }
      })
      if (res.status === 200) {
        localStorage.removeItem("api_token")
        setToken(null)
        setUser(null)
        setCompanies(null)
      } else {
        console.error("Error signing out")
      }
    } catch (err) {
        setError(err)
        return null
      }
    }

  return (
    <AuthContext.Provider value={{ user, error, setUser, authenticate, logout, checkUser, token, loading, companies }}>
      {props.children}
    </AuthContext.Provider>)
}
