import React, { useState } from 'react'
import Nav from './components/Nav'
import Tutoring from './pages/Tutoring'
import Exams from './pages/Exams'
import Materials from './pages/Materials'
import Users from './pages/Users'

export default function App() {
  const [route, setRoute] = useState('tutoring')

  return (
    <div className="app">
      <Nav route={route} setRoute={setRoute} />
      <main className="container">
        {route === 'tutoring' && <Tutoring />}
        {route === 'exams' && <Exams />}
        {route === 'materials' && <Materials />}
        {route === 'users' && <Users />}
      </main>
    </div>
  )
}
