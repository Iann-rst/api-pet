import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateOrgUseCase } from './authenticate'

let inMemoryOrgRepository: InMemoryOrgRepository
let authenticateOrgUseCase: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    authenticateOrgUseCase = new AuthenticateOrgUseCase(inMemoryOrgRepository)
  })

  it('should be able to authenticate org', async () => {
    await inMemoryOrgRepository.create({
      name: 'John Doe Org',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
      address: 'rua a',
      cep: '47802-028',
      city: 'Barreiras',
      whatsapp: '99999999999',
    })

    const { org } = await authenticateOrgUseCase.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateOrgUseCase.execute({
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryOrgRepository.create({
      name: 'John Doe Org',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
      address: 'rua a',
      cep: '47802-028',
      city: 'Barreiras',
      whatsapp: '99999999999',
    })

    await expect(() =>
      authenticateOrgUseCase.execute({
        email: 'johndoe@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
