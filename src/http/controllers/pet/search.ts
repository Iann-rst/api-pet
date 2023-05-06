import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetsByCityUseCase } from '@/use-cases/pet/fetch-pets-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const searchParamsSchema = z.object({
  city: z
    .string({ required_error: 'Informe a cidade.' })
    .trim()
    .nonempty({ message: 'Informe a cidade.' }),
})

const searchQuerySchema = z.object({
  age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
  size: z.enum(['small', 'medium', 'big']).optional(),
  independence: z.enum(['low', 'medium', 'high']).optional(),
  type: z.enum(['cat', 'dog']).optional(),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { city } = searchParamsSchema.parse(request.params)
  const query = searchQuerySchema.parse(request.query)

  const petsRepository = new PrismaPetRepository()
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository)

  const { pets } = await fetchPetsByCityUseCase.execute({ city, query })

  return reply.status(200).send({ pets })
}
