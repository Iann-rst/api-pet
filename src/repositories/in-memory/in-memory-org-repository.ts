import { randomUUID } from 'node:crypto'
import { CreateOrgDTO } from '../dto/org/create-org-dto'
import { Org } from '../dto/org/org'
import { OrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgRepository {
  private orgs: Org[] = []

  async create(data: CreateOrgDTO): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      whatsapp: data.whatsapp,
      password: data.password,
      city: data.city,
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
