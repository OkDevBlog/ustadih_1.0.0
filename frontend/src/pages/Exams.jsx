import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Exams(){
  const [exams, setExams] = useState([])

  useEffect(()=>{ load() }, [])

  async function load(){
    try{
      const res = await api.listExams()
      setExams(res || [])
    }catch(e){ console.error(e); alert(e.message) }
  }

  return (
    <div>
      <h2>Exams</h2>
      <div className="card">
        {exams.length===0 && <div>No exams found</div>}
        <ul>
          {exams.map(x=> (
            <li key={x.id}><strong>{x.title}</strong> — {x.subject} — {x.grade_level || x.grade}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
