import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgNotFoundError } from '../errors/org-not-found-error'
import { RegisterPetUseCase } from './register'

let inMemoryOrgRepository: InMemoryOrgRepository
let inMemoryPetRepository: InMemoryPetRepository
let sut: RegisterPetUseCase
describe('Register Pet Use Case', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    inMemoryPetRepository = new InMemoryPetRepository(inMemoryOrgRepository)
    sut = new RegisterPetUseCase(inMemoryPetRepository, inMemoryOrgRepository)
  })

  it('should be able to register a pet', async () => {
    const org = await inMemoryOrgRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '47802-028',
      address: 'rua a',
      whatsapp: '999999999',
      city: 'Barreiras',
    })

    const { pet } = await sut.execute({
      name: 'Magali',
      description: 'Gato mestiço',
      age: 'cub',
      lvl_independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: org.id,
    })

    expect(pet).toHaveProperty('id')
  })

  it('should not be able to register a pet without org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Magali',
        description: 'Gato mestiço',
        age: 'cub',
        lvl_independence: 'low',
        size: 'small',
        type: 'cat',
        org_id: 'org id fake',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
