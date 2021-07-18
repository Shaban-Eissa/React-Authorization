import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card className='LoginForm' >
        <Card.Body>
          <h2 className="text-center mb-4">Log in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className='Form' onSubmit={handleSubmit} >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" style={{marginTop:'40px'}}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit" style={{marginTop:'40px'}}>
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password"  style = {{textDecoration:'none'}}>Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup"  style = {{textDecoration:'none'}}>Sign Up</Link>
      </div>
        </Card.Body>
      </Card>
     
    </>
  )
}
