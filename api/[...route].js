// API Proxy - Roteia para o backend Express

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

export default {
  async fetch(request) {
    try {
      // Construir URL completa da requisição
      const url = new URL(request.url)
      const path = url.pathname.replace('/api', '')
      const queryString = url.search
      const targetUrl = `${BACKEND_URL}/api${path}${queryString}`

      console.log(`[PROXY] ${request.method} ${targetUrl}`)

      // Fazer requisição para o backend
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
          ...(request.headers.get('authorization') && { Authorization: request.headers.get('authorization') })
        },
        body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined
      })

      const data = await response.json()

      return Response.json(data, { status: response.status })
    } catch (error) {
      console.error('[PROXY ERROR]', error)
      return Response.json({
        error: 'Erro ao conectar com o backend'
      }, { status: 500 })
    }
  }
}
