/* Explicação dos três ramos:
 + 1. error.response: A requisição foi enviada e o servidor respondeu, mas com um código de status de erro (ex: 4xx ou 5xx).
 + 2. error.request: A requisição foi feita, mas nenhuma resposta foi recebida do servidor.
 + 3. else (genérico): Ocorre antes mesmo de enviar a requisição de fato, cobrindo erros de configuração ou falhas ao tentar montar a chamada (ex: parâmetros inválidos de setup).
*/
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fittrack_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const apiError = error.response.data

      if (error.response.status === 401) {
        localStorage.removeItem('fittrack_token')
        localStorage.removeItem('fittrack_user')

        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
      
      return Promise.reject({
        message: apiError.message || 'Ocorreu um erro na requisição.',
        errors: apiError.errors || [],
        status: error.response.status,
      })
      
    } else if (error.request) {
      return Promise.reject({
        message: 'Não foi possível se conectar ao servidor. Verifique sua conexão ou tente',
        errors: [],
        status: null,
      })
    } else {
      return Promise.reject({
        message: 'Erro inesperado ao preparar a requisição.',
        errors: [],
        status: null,
      })
    }
  }
)

export default api