import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetNotFoundError } from '../errors/pet-not-found-error'
import { GetPetByIdUseCase } from './get-pet-by-id'

let inMemoryPetRepository: InMemoryPetRepository
let inMemoryOrgRepository: InMemoryOrgRepository
let sut: GetPetByIdUseCase

describe('Get Pet By Id Use Case (details)', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    inMemoryPetRepository = new InMemoryPetRepository(inMemoryOrgRepository)
    sut = new GetPetByIdUseCase(inMemoryPetRepository)
  })

  it('should be able to view details of a pet', async () => {
    const org = await inMemoryOrgRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '47802-028',
      address: 'rua a',
      whatsapp: '999999999',
      city: 'Barreiras',
    })

    const new_pet = await inMemoryPetRepository.create({
      name: 'Magali',
      description: 'Gato mestiço',
      age: 'cub',
      lvl_independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: org.id,
    })

    const { pet } = await sut.execute({
      petId: new_pet.id,
    })

    expect(pet.id).toEqual(new_pet.id)
    expect(pet.name).toEqual('Magali')
    expect(pet.Org?.id).toEqual(org.id)
  })

  it('should not be able to view details of a non-existing pet', async () => {
    const org = await inMemoryOrgRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '47802-028',
      address: 'rua a',
      whatsapp: '999999999',
      city: 'Barreiras',
    })

    await inMemoryPetRepository.create({
      name: 'Magali',
      description: 'Gato mestiço',
      age: 'cub',
      lvl_independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: org.id,
    })

    await expect(() =>
      sut.execute({
        petId: 'pet-id fake',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
