import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Nav({ route, setRoute }) {
  const [user, setUser] = useState(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
  function handleLogin(){
    // Start OAuth flow on backend
    window.location.href = `${API_BASE}/auth/google/login`
  }

  function handleLogout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_id')
    setUser(null)
    setRoute('tutoring')
  }

  useEffect(()=>{
    async function loadUser(){
      try{
        const uid = localStorage.getItem('user_id')
        if (!uid) return
        const res = await api.getUser(uid)
        setUser(res)
      }catch(err){
        console.error('Failed to load user:', err)
        // Clear invalid auth
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_id')
        setUser(null)
      }
    }
    if (token) loadUser()
  }, [token])

  return (
    <nav className="nav">
      <div className="brand">Ustadih</div>
      <div className="links">
        <button className={route==='tutoring'? 'active':''} onClick={()=>setRoute('tutoring')}>Tutoring</button>
        <button className={route==='exams'? 'active':''} onClick={()=>setRoute('exams')}>Exams</button>
        <button className={route==='materials'? 'active':''} onClick={()=>setRoute('materials')}>Materials</button>
        <button className={route==='users'? 'active':''} onClick={()=>setRoute('users')}>Profile</button>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>Hello, {user.full_name || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={()=>{ window.location.href = '/login' }}>Login</button>
            <button onClick={handleLogin}>Login with Google</button>
            <button onClick={()=>{ window.location.href = '/register' }}>Register</button>
          </>
        )}
      </div>
    </nav>
  )
}
