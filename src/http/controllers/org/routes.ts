import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'

export async function orgRoutes(app: FastifyInstance) {
  // registrar uma org
  app.post('/register', register)

  // realizar login como org
  app.post('/session', authenticate)
}
