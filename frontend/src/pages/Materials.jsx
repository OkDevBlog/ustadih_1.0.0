import React, { useState } from 'react'
import api from '../api'

export default function Materials(){
  const [title, setTitle] = useState('Example Material')
  const [content, setContent] = useState('# Hello\nThis is a sample markdown')
  const [subject, setSubject] = useState('General')
  const [topic, setTopic] = useState('Intro')
  const [resp, setResp] = useState(null)

  async function handleUpload(){
    try{
      const payload = { title, content_markdown: content, subject, topic }
      const res = await api.uploadMaterial(payload)
      setResp(JSON.stringify(res, null, 2))
    }catch(e){ alert(e.message) }
  }

  return (
    <div>
      <h2>Upload Material</h2>
      <div className="card">
        <label>Title <input value={title} onChange={e=>setTitle(e.target.value)} /></label>
        <label>Subject <input value={subject} onChange={e=>setSubject(e.target.value)} /></label>
        <label>Topic <input value={topic} onChange={e=>setTopic(e.target.value)} /></label>
        <label>Markdown</label>
        <textarea value={content} onChange={e=>setContent(e.target.value)} rows={10} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {resp && <pre className="card">{resp}</pre>}
    </div>
  )
}
