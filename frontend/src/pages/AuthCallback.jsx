import React, { useEffect } from 'react'

export default function AuthCallback(){
  useEffect(()=>{
    // Parse fragment for token data (access_token etc.)
    const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
    const params = new URLSearchParams(hash)
    const access_token = params.get('access_token')
    const user_id = params.get('user_id')
    if (access_token){
      localStorage.setItem('access_token', access_token)
      if (user_id) localStorage.setItem('user_id', user_id)
      // Clean up URL (remove fragment)
      window.history.replaceState({}, document.title, '/')
      // Reload app to pick up auth state
      window.location.href = '/'
    } else {
      console.error('No access_token found in callback')
    }
  }, [])

  return (
    <div className="container">
      <div className="card">Processing login... you will be redirected shortly.</div>
    </div>
  )
}
