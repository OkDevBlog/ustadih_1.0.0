import React, { useState } from 'react'
import api from '../api'

export default function Login({ onLoggedIn }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    try{
      const payload = { email, password }
      const res = await api.loginUser(payload)
      if (res && res.access_token){
        localStorage.setItem('access_token', res.access_token)
        if (res.user_id) localStorage.setItem('user_id', res.user_id)
        alert('Logged in')
        if (onLoggedIn) onLoggedIn()
        else window.location.href = '/'
      } else {
        alert('Login succeeded but no token returned')
      }
    }catch(err){
      alert(err.message || 'Login failed')
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h2>Login</h2>
      <form className="card" onSubmit={handleSubmit}>
        <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required/></label>
        <label>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" required/></label>
        <button type="submit" disabled={loading}>{loading? 'Please wait...':'Login'}</button>
      </form>
    </div>
  )
}
