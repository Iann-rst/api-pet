import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { GetPetByIdUseCase } from '@/use-cases/pet/get-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const detailsParamsSchema = z.object({
  petId: z.string(),
})

export async function details(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { petId } = detailsParamsSchema.parse(request.params)

    const petsRepository = new PrismaPetRepository()
    const getPetByIdUseCase = new GetPetByIdUseCase(petsRepository)

    const { pet } = await getPetByIdUseCase.execute({ petId })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
