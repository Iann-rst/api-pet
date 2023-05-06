import { ResponsePet } from '@/repositories/dto/pet/pet'
import { PetRepository } from '@/repositories/pet-repository'

interface FetchPetsByCityUseCaseRequest {
  city: string
}

interface FetchPetsByCityUseCaseResponse {
  pets: ResponsePet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city)

    return { pets }
  }
}
