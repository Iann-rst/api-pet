import { CreateOrgDTO } from '@/repositories/dto/org/create-org-dto'
import { Org } from '@/repositories/dto/org/org'
import { OrgRepository } from '@/repositories/org-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    email,
    cep,
    address,
    whatsapp,
    password,
    city,
  }: CreateOrgDTO): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      email,
      address,
      cep,
      city,
      whatsapp,
      password: password_hash,
    })

    return { org }
  }
}
