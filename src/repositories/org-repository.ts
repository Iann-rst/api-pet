import { CreateOrgDTO } from './dto/org/create-org-dto'
import { Org } from './dto/org/org'

export interface OrgRepository {
  create(data: CreateOrgDTO): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
}
