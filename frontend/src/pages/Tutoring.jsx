import React, { useState } from 'react'
import api from '../api'

export default function Tutoring(){
  const [sessionId, setSessionId] = useState('')
  const [topic, setTopic] = useState('Algebra')
  const [subject, setSubject] = useState('Math')
  const [userId, setUserId] = useState('user_test')
  const [message, setMessage] = useState('')
  const [answer, setAnswer] = useState(null)

  async function handleStart(){
    try{
      const res = await api.startSession({ topic, subject, grade: '10' }, userId)
      setSessionId(res.id)
      alert('Session started: ' + res.id)
    }catch(e){ alert(e.message) }
  }

  async function handleAsk(){
    try{
      const res = await api.askQuestion(sessionId, { message, subject, topic }, userId)
      setAnswer(res.answer || JSON.stringify(res))
    }catch(e){ alert(e.message) }
  }

  return (
    <div>
      <h2>Tutoring</h2>
      <div className="card">
        <label>User ID <input value={userId} onChange={e=>setUserId(e.target.value)} /></label>
        <label>Topic <input value={topic} onChange={e=>setTopic(e.target.value)} /></label>
        <label>Subject <input value={subject} onChange={e=>setSubject(e.target.value)} /></label>
        <button onClick={handleStart}>Start Session</button>
        <div>Session ID: <strong>{sessionId}</strong></div>
      </div>

      <div className="card">
        <textarea placeholder="Ask a question..." value={message} onChange={e=>setMessage(e.target.value)} />
        <button disabled={!sessionId} onClick={handleAsk}>Ask</button>
      </div>

      {answer && (
        <div className="card">
          <h4>Answer</h4>
          <div className="answer">{answer}</div>
        </div>
      )}
    </div>
  )
}
