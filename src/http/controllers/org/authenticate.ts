import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { AuthenticateOrgUseCase } from '@/use-cases/org/authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: 'Informe a senha.' }),
})

/*
 * Token e refresh_token
 * Token fica visível para a aplicação front-end mobile ter acesso
 * Refresh-token não fica visível, melhor forma de salvar o refresh-token é usando cookie
 */

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const orgRepository = new PrismaOrgRepository()
    const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgRepository)

    const { org } = await authenticateOrgUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refresh_token', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })

    // salva o refresh_token no cookie e manda o token como resposta da requisição
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: error.message,
      })
    }

    throw error
  }
}
