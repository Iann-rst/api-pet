import { ResponsePet } from '@/repositories/dto/pet/pet'
import { PetRepository } from '@/repositories/pet-repository'
import { ParamsPet } from '@/utils/params'

interface FetchPetsByCityUseCaseRequest {
  city: string
  query?: ParamsPet
}

interface FetchPetsByCityUseCaseResponse {
  pets: ResponsePet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    city,
    query,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city, query)

    return { pets }
  }
}
