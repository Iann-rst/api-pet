import { prisma } from '@/lib/prisma'
import { CreateOrgDTO } from '../dto/org/create-org-dto'
import { Org } from '../dto/org/org'
import { OrgRepository } from '../org-repository'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: CreateOrgDTO): Promise<Org> {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }
}
