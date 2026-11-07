
import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
  e.preventDefault()

  if (isSignup && !name.trim()) {
    alert('Please enter your name')
    return
  }

  if (!email.trim() || !password) {
    alert('Please enter email and password')
    return
  }

  onLogin({
    name: name.trim() || email.trim().split('@')[0],
    email: email.trim()
  })
}

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">💼</div>

        <h1>Job Tracker</h1>
        <p className="login-subtitle">
          Track your career journey in one place.
        </p>

        <h2>{isSignup ? 'Create Account' : 'Welcome Back!'}</h2>

        <p>
          {isSignup
            ? 'Sign up to get started'
            : 'Login to your dashboard'}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className="login-switch">
          {isSignup
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}

          <button
            type="button"
            className="switch-button"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
