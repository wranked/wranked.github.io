import React from 'react'
import { FaAt, FaLock } from 'react-icons/fa'
import Card from '../common/Card'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  return (
    <div>
      <h1>Register Page</h1>
      <Card>
        <form onSubmit="">
          <div>
            <FaAt /><input type="email" placeholder="Email" onChange="" required></input>
          </div>
          <div>
            <FaLock /><input type="password" placeholder="Password" onChange="" required></input>
          </div>
          <p>By clicking Agree & Join, you agree to the User Agreement, Privacy Policy, and Cookie Policy.</p>
          <button type="submit">Sign up</button>
        </form>
        Already registered? <Link to="/login">Sign in</Link>
      </Card>


    </div>
  )
}
