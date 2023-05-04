import fastifyCookie from '@fastify/cookie'
import { fastifyJwt } from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { orgRoutes } from './http/controllers/org/routes'
import { petRoutes } from './http/controllers/pet/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refresh_token',
    signed: false,
  },
})

app.register(fastifyCookie)

app.register(orgRoutes, {
  prefix: 'org',
})

app.register(petRoutes, {
  prefix: 'pet',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
