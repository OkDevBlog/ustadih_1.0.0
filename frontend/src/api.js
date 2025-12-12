const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

async function request(path, options = {}){
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`${res.status} ${res.statusText}: ${txt}`)
  }
  try { return await res.json() } catch(e) { return null }
}

export async function startSession(data, userId){
  return request('/tutoring/sessions/start', { method: 'POST', body: JSON.stringify({ ...data }), headers: { 'Content-Type': 'application/json' } })
}

export async function askQuestion(sessionId, questionData, userId){
  return request(`/tutoring/sessions/${sessionId}/ask`, { method: 'POST', body: JSON.stringify({ ...questionData }), headers: { 'Content-Type': 'application/json' } })
}

export async function listExams(){
  return request('/exams/')
}

export async function uploadMaterial(payload){
  return request('/rag/materials/upload-markdown', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
}

export async function getUser(userId){
  return request(`/users/${userId}`)
}

export default { startSession, askQuestion, listExams, uploadMaterial, getUser }
