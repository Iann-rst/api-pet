import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { details } from './details'
import { register } from './register'
import { search } from './search'

export async function petRoutes(app: FastifyInstance) {
  // Rota para registrar um pet
  app.post('/register', { onRequest: [verifyJwt] }, register)

  // buscar detalhes de um pet específico
  app.get('/:petId', details)

  // buscar pets (filtrados) por nome de cidade
  app.get('/cities/:city', search)
}
