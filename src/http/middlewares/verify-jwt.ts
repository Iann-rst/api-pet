import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.headers.authorization) {
      return reply.status(404).send({
        message: 'Token não encontrado!',
      })
    }

    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({
      message: 'Token inválido',
    })
  }
}
