import React, { useState } from 'react'
import { FaAt, FaLock, FaUser } from 'react-icons/fa'
// import Card from '../common/Card'
import Card from 'react-bootstrap/Card'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import GoBack from '../common/GoBack'
import { Link } from 'react-router-dom'
import { useApiClient } from '../context/ApiClient'

export default function RegisterPage() {

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState()

  const client = useApiClient()

  function submitRegister(event) {
    event.preventDefault()
    client
      .post(`register/`,
        {
          "first_name": firstname,
          "last_name": lastname,
          // "username": email,
          "email": email,
          "password": password,
          "picture": `https://i.pravatar.cc/150?u=${email}`,
        },
      )
      .then(function (res) {

      })
      .catch(function (err) {
        setError(err)
      })
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Register</Card.Title>
        <Form onSubmit={e => submitRegister(e)}>
          <FloatingLabel controlId="floatingInput" label="First name" className="mb-2">
            <Form.Control type="name" placeholder="John" onChange={e => setFirstname(e.target.value)} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Last name" className="mb-2">
            <Form.Control type="name" placeholder="Doe" onChange={e => setLastname(e.target.value)} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput3" label="Email address" className="mb-2">
            <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput4" label="Password" className="mb-2">
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput5" label="Repeat password" className="mb-2">
            <Form.Control type="password" placeholder="Repeat password" onChange={e => setPassword2(e.target.value)} required />
          </FloatingLabel>
          {/* <FaUser /><input type="name" placeholder="First name" onChange={e => setFirstname(e.target.value)} required /><br />
            <FaUser /><input type="name" placeholder="Last name" onChange={e => setLastname(e.target.value)} required /><br />
            <FaAt /><input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br />
            <FaLock /><input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br />
            <FaLock /><input type="password" placeholder="Repeat password" onChange={e => setPassword2(e.target.value)} required /><br /> */}
          <p>By clicking Agree & Join, you agree to the User Agreement, Privacy Policy, and Cookie Policy.</p>
          <Button type="submit">Sign up</Button>
        </Form>
        Already registered? <Link to="/login">Sign in</Link><br />
        <Button><GoBack /></Button>
      </Card.Body>
    </Card>
  )
}
