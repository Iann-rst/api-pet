import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let inMemoryPetRepository: InMemoryPetRepository
let inMemoryOrgRepository: InMemoryOrgRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets By City', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    inMemoryPetRepository = new InMemoryPetRepository(inMemoryOrgRepository)
    sut = new FetchPetsByCityUseCase(inMemoryPetRepository)
  })

  it('should be able to fetch all pets by city', async () => {
    /* Cria a primeira org com city = Barreiras */
    const org = await inMemoryOrgRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '47802-028',
      address: 'rua a',
      whatsapp: '999999999',
      city: 'Barreiras',
    })

    /* Cria 1º pet dessa org */
    await inMemoryPetRepository.create({
      name: 'Magali',
      description: 'Gato mestiço',
      age: 'cub',
      lvl_independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: org.id,
    })

    /* Cria 2º pet dessa org */
    await inMemoryPetRepository.create({
      name: 'Cascão',
      description: 'Gato frajola',
      age: 'cub',
      lvl_independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: org.id,
    })

    /* Cria a segunda org com city = Rio de Janeiro */
    const org2 = await inMemoryOrgRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@email.com',
      password: '123456',
      cep: '20211-901',
      address: 'rua a',
      whatsapp: '999999999',
      city: 'Rio de Janeiro',
    })

    /* Cria 1 pet nessa segunda org */
    await inMemoryPetRepository.create({
      name: 'Cebola',
      description: 'Gata laranja',
      age: 'cub',
      lvl_independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: org2.id,
    })

    const { pets } = await sut.execute({
      city: 'Barreiras',
    })

    expect(pets).toHaveLength(2)
  })
})
