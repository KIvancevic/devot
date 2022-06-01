import React, { useRef, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/trackers')
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
      <div className="container2">
        <div>
          <h2 >Log in</h2>
          {error && <h1>{error}</h1>}
          <form onSubmit={handleSubmit}>
          <div id="name">
              <label>Email*</label>
              <input type="text" ref={emailRef} required />
            </div>
            {/* <div id="name">
              <label>Name</label>
              <input type="text" ref={nameRef} required />
            </div> */}
            <div id="password">
              <label>Password*</label>
              <input type="password" ref={passwordRef} required />
            </div>
            <button disabled={loading} type="submit">
              Log in
            </button>
          </form>
        </div>
        <div>
          <div>
            Need an account? <Link to="/signup">Register here</Link>
          </div>
        </div>
      </div>
  )
}






