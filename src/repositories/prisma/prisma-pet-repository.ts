import { prisma } from '@/lib/prisma'
import { CreatePetDTO } from '../dto/pet/create-pet-dto'
import { ResponsePet } from '../dto/pet/pet'
import { PetRepository } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: CreatePetDTO): Promise<ResponsePet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findManyByCity(city: string): Promise<ResponsePet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
      },
    })

    return pets
  }

  async findById(id: string): Promise<ResponsePet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
      include: {
        org: true,
      },
    })

    return pet
  }
}