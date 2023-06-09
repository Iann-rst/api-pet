import { ParamsPet } from '@/utils/params'
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

  async findManyByCity(
    city: string,
    params?: ParamsPet,
  ): Promise<ResponsePet[]> {
    const orgs = await this.orgRepository.findManyByCity(city)

    const petsByOrgsInCity = this.pets.filter((pet) => {
      return orgs.find((org) => org.id === pet.org_id)
    })

    if (!params) {
      return petsByOrgsInCity
    }
    const petFiltered = petsByOrgsInCity.filter(
      (pet) =>
        (!params.age || pet.age === params?.age) &&
        (!params.lvl_independence ||
          pet.lvl_independence === params?.lvl_independence) &&
        (!params.size || pet.size === params?.size) &&
        (!params.type || pet.type === params?.type),
    )

    return petFiltered
  }

  async findById(id: string): Promise<ResponsePet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    const org = await this.orgRepository.findById(pet.org_id)

    if (!org) {
      return null
    }

    pet.Org = org

    return pet
  }
}
