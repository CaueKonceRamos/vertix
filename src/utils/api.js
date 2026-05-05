// Configuração dinâmica de URL da API
// Em produção (Vercel), usa rotas relativas /api
// Em desenvolvimento, usa localhost
const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:5000'

export const apiConfig = {
  baseURL: API_BASE_URL,
  
  // URLs construídas dinamicamente
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    logout: `${API_BASE_URL}/api/auth/logout`
  },
  
  projects: {
    list: `${API_BASE_URL}/api/projects`,
    get: (id) => `${API_BASE_URL}/api/projects/${id}`,
    create: `${API_BASE_URL}/api/projects`,
    update: (id) => `${API_BASE_URL}/api/projects/${id}`,
    delete: (id) => `${API_BASE_URL}/api/projects/${id}`
  },
  
  classrooms: {
    list: `${API_BASE_URL}/api/classrooms`,
    get: (id) => `${API_BASE_URL}/api/classrooms/${id}`,
    create: `${API_BASE_URL}/api/classrooms`,
    update: (id) => `${API_BASE_URL}/api/classrooms/${id}`,
    delete: (id) => `${API_BASE_URL}/api/classrooms/${id}`,
    members: (id) => `${API_BASE_URL}/api/classrooms/${id}/members`,
    projects: (id) => `${API_BASE_URL}/api/classrooms/${id}/projects`,
    join: `${API_BASE_URL}/api/classrooms/join`
  },
  
  messages: {
    list: (projectId) => `${API_BASE_URL}/api/messages?projectId=${projectId}`,
    create: `${API_BASE_URL}/api/messages`
  },
  
  users: {
    get: (id) => `${API_BASE_URL}/api/users/${id}`,
    update: (id) => `${API_BASE_URL}/api/users/${id}`
  }
}

// Helper para fetch com configurações padrão
export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token')
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  })
  
  return response
}
