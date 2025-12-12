import React, { useState } from 'react'
import api from '../api'

export default function Register({ onRegistered }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    try{
      const payload = { email, password, full_name: fullName }
      const res = await api.registerUser(payload)
      if (res && res.access_token){
        localStorage.setItem('access_token', res.access_token)
        if (res.user_id) localStorage.setItem('user_id', res.user_id)
        alert('Registered and logged in')
        if (onRegistered) onRegistered()
      } else {
        alert('Registration succeeded but no token returned')
      }
    }catch(err){
      alert(err.message || 'Registration failed')
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h2>Register</h2>
      <form className="card" onSubmit={handleSubmit}>
        <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required/></label>
        <label>Full name<input value={fullName} onChange={e=>setFullName(e.target.value)} /></label>
        <label>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" required/></label>
        <button type="submit" disabled={loading}>{loading? 'Please wait...':'Register'}</button>
      </form>
    </div>
  )
}
