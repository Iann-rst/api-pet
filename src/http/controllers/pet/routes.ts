import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function petRoutes(app: FastifyInstance) {
  // Rota para registrar um pet
  app.post('/register', { onRequest: [verifyJwt] }, register)
}
