import React from 'react'

export default function Nav({ route, setRoute }) {
  return (
    <nav className="nav">
      <div className="brand">Ustadih</div>
      <div className="links">
        <button className={route==='tutoring'? 'active':''} onClick={()=>setRoute('tutoring')}>Tutoring</button>
        <button className={route==='exams'? 'active':''} onClick={()=>setRoute('exams')}>Exams</button>
        <button className={route==='materials'? 'active':''} onClick={()=>setRoute('materials')}>Materials</button>
        <button className={route==='users'? 'active':''} onClick={()=>setRoute('users')}>Profile</button>
      </div>
    </nav>
  )
}
