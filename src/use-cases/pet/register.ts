import { CreatePetDTO } from '@/repositories/dto/pet/create-pet-dto'
import { OrgRepository } from '@/repositories/org-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { OrgNotFoundError } from '../errors/org-not-found-error'

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    name,
    age,
    description,
    lvl_independence,
    org_id,
    size,
    type,
  }: CreatePetDTO) {
    const org = await this.orgRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petRepository.create({
      name,
      age,
      description,
      lvl_independence,
      org_id,
      size,
      type,
    })

    return { pet }
  }
}
