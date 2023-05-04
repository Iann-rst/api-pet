import { CreatePetDTO } from './dto/pet/create-pet-dto'
import { ResponsePet } from './dto/pet/pet'

export interface PetRepository {
  create(data: CreatePetDTO): Promise<ResponsePet>
  findManyByCity(city: string): Promise<ResponsePet[]>
  findById(id: string): Promise<ResponsePet | null>
}
