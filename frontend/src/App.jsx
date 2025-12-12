import React, { useState } from 'react'
import Nav from './components/Nav'
import Tutoring from './pages/Tutoring'
import Exams from './pages/Exams'
import Materials from './pages/Materials'
import Users from './pages/Users'
import AuthCallback from './pages/AuthCallback'
import { useEffect } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'

export default function App() {
  const [route, setRoute] = useState('tutoring')

  useEffect(()=>{
    // If frontend route is /auth-callback (redirect from backend), show callback handler
    if (window.location.pathname === '/auth-callback') setRoute('auth-callback')
    // If pathname is /register
    if (window.location.pathname === '/register') setRoute('register')
    if (window.location.pathname === '/login') setRoute('login')
  }, [])

  return (
    <div className="app">
      <Nav route={route} setRoute={setRoute} />
      <main className="container">
        {route === 'tutoring' && <Tutoring />}
        {route === 'exams' && <Exams />}
        {route === 'materials' && <Materials />}
        {route === 'users' && <Users />}
        {route === 'auth-callback' && <AuthCallback />}
        {route === 'register' && <Register onRegistered={()=>setRoute('tutoring')} />}
        {route === 'login' && <Login onLoggedIn={()=>setRoute('tutoring')} />}
      </main>
    </div>
  )
}
