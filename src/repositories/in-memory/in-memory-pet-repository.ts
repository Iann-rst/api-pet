import { randomUUID } from 'node:crypto'
import { CreatePetDTO } from '../dto/pet/create-pet-dto'
import { ResponsePet } from '../dto/pet/pet'
import { OrgRepository } from '../org-repository'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  constructor(private orgRepository: OrgRepository) {}
  public pets: ResponsePet[] = []

  async create(data: CreatePetDTO): Promise<ResponsePet> {
    const pet: ResponsePet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      lvl_independence: data.lvl_independence,
      org_id: data.org_id,
      size: data.size,
      type: data.type,
    }

    this.pets.push(pet)

    return pet
  }

  async findManyByCity(city: string): Promise<ResponsePet[]> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<ResponsePet | null> {
    throw new Error('Method not implemented.')
  }
}
