import React from 'react'
import { FaAt, FaLock } from "react-icons/fa"
import { useState, useEffect } from 'react'

import AppContent from 'shared/layout/AppContent'
import { useAuth } from 'features/auth/context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'


export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const authContext = useAuth()
  const navigate = useNavigate()

  async function submitLogin(event) {
    event.preventDefault()
    const user = await authContext.authenticate({
      email: email,
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
      <Form onSubmit={e => submitLogin(e)}>

        <InputGroup>
          <InputGroup.Text id="basic-addon1"><FaAt /></InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)} required
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="basic-addon1"><FaLock /></InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)} required
          />
        </InputGroup>
        <Link>Forgot password?</Link>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </AppContent>
  )
}
