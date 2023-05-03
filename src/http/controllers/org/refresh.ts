import { FastifyReply, FastifyRequest } from 'fastify'

/*
 * Rota para ser chamada pelo front-end quando o usuário não estiver mais autenticado
 * token invalido
 */

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) // verificar apenas se nos cookie tem um token

  // caso tenha irá gerar um novo token e um novo refresh_token
  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '10m',
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
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
}
