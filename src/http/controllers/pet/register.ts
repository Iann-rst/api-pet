import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { RegisterPetUseCase } from '@/use-cases/pet/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerPetBodySchema = z.object({
  name: z
    .string({ required_error: 'Informe o nome do pet.' })
    .trim()
    .nonempty({ message: 'Informe o nome do pet.' }),

  description: z
    .string({ required_error: 'Informe uma descrição sobre o pet.' })
    .trim()
    .nonempty({ message: 'Informe uma descrição do pet.' }),

  age: z.enum(['cub', 'adolescent', 'elderly']),
  size: z.enum(['small', 'medium', 'big']),
  lvl_independence: z.enum(['low', 'medium', 'high']),
  type: z.enum(['cat', 'dog']),
})

export type RegisterPetDTO = z.infer<typeof registerPetBodySchema>

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const org_id = request.user.sub
    const { name, age, description, lvl_independence, size, type } =
      registerPetBodySchema.parse(request.body)

    const petRepository = new PrismaPetRepository()
    const orgRepository = new PrismaOrgRepository()
    const registerPetUseCase = new RegisterPetUseCase(
      petRepository,
      orgRepository,
    )

    const { pet } = await registerPetUseCase.execute({
      age,
      description,
      lvl_independence,
      name,
      org_id,
      size,
      type,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
