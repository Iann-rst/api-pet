import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register'

let inMemoryOrgRepository: InMemoryOrgRepository
let registerOrgUseCase: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    registerOrgUseCase = new RegisterOrgUseCase(inMemoryOrgRepository)
  })

  it('Should be able to register new ORG', async () => {
    const { org } = await registerOrgUseCase.execute({
      name: 'John Doe Org',
      email: 'johndoe@email.com',
      password: '123456',
      address: 'rua a',
      cep: '47802-028',
      city: 'Barreiras',
      whatsapp: '99999999999',
    })

    expect(org).toHaveProperty('id')
    expect(org.id).toEqual(expect.any(String))
  })

  it('Should not be able to register ORG with same email', async () => {
    const email = 'johndoe@email.com'

    await registerOrgUseCase.execute({
      name: 'John Doe Org',
      email,
      password: '123456',
      address: 'rua a',
      cep: '47802-028',
      city: 'Barreiras',
      whatsapp: '99999999999',
    })

    await expect(() =>
      registerOrgUseCase.execute({
        name: 'John Doe Org',
        email: 'johndoe@email.com',
        password: '123456',
        address: 'rua a',
        cep: '47802-028',
        city: 'Barreiras',
        whatsapp: '99999999999',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
