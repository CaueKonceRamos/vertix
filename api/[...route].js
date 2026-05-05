// API Proxy - Roteia para o backend Express

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

export default async function handler(req, res) {
  try {
    // Construir URL completa da requisição
    const path = req.url.split('?')[0].replace('/api', '')
    const queryString = req.url.includes('?') ? `?${req.url.split('?')[1]}` : ''
    const targetUrl = `${BACKEND_URL}/api${path}${queryString}`

    console.log(`[PROXY] ${req.method} ${targetUrl}`)

    // Fazer requisição para o backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization })
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    })

    const data = await response.json()

    res.status(response.status).json(data)
  } catch (error) {
    console.error('[PROXY ERROR]', error)
    res.status(500).json({
      error: 'Erro ao conectar com o backend'
    })
  }
}
