import { ResponsePet } from '@/repositories/dto/pet/pet'
import { PetRepository } from '@/repositories/pet-repository'
import { PetNotFoundError } from '../errors/pet-not-found-error'

interface GetPetByIdUseCaseRequest {
  petId: string
}

interface GetPetByIdUseCaseResponse {
  pet: ResponsePet
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    petId,
  }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
