import React, { useState } from 'react'
import api from '../api'

export default function Users(){
  const [userId, setUserId] = useState('user_test')
  const [profile, setProfile] = useState(null)

  async function load(){
    try{
      const res = await api.getUser(userId)
      setProfile(res)
    }catch(e){ alert(e.message) }
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div className="card">
        <label>User ID <input value={userId} onChange={e=>setUserId(e.target.value)} /></label>
        <button onClick={load}>Load</button>
      </div>
      {profile && <div className="card"><pre>{JSON.stringify(profile, null, 2)}</pre></div>}
    </div>
  )
}
