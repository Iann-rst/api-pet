import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { RegisterOrgUseCase } from '@/use-cases/org/register'
import axios from 'axios'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerBodySchema = z
  .object({
    name: z
      .string({ required_error: 'Informe o nome do responsável pela Org' })
      .trim()
      .nonempty({ message: 'Informe o nome do responsável pela Org.' }),

    email: z
      .string({ required_error: 'Informe o email da Org.' })
      .email({ message: 'Informe um email válido. Ex.: exemplo@email.com' }),

    cep: z
      .string({ required_error: 'Informe o CEP.' })
      .refine(
        (value) => /^[0-9]{5}-[0-9]{3}$/.test(value),
        'Informe um cep válido. Ex.: 01153-000',
      ),

    address: z
      .string({ required_error: 'Informe o endereço.' })
      .trim()
      .nonempty({ message: 'Informe o endereço.' }),

    whatsapp: z
      .string({ required_error: 'Informe o número do WhatsApp!' })
      .trim()
      .nonempty({ message: 'Informe o número do WhatsApp!' }),

    password: z
      .string({
        required_error: 'Informe a senha.',
      })
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),

    password_confirm: z
      .string({
        required_error: 'Confirme a senha.',
      })
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ['password_confirm'],
    message: 'Senhas diferentes.',
  })

/*
 ** Controller de registar um org
 ** Pegar o nome da cidade a partir do CEP informado
 */

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, cep, address, whatsapp, password } =
      registerBodySchema.parse(request.body)

    // buscar a cidade a partir do CEP informado
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    if (response.data.erro) {
      return reply.status(404).send({
        message:
          'Erro ao registar a organização. Confirme o CEP informado e tente novamente.',
      })
    }

    const city: string = response.data.localidade

    const orgRepository = new PrismaOrgRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgRepository)

    const { org } = await registerOrgUseCase.execute({
      name,
      email,
      cep,
      address,
      whatsapp,
      password,
      city,
    })

    return reply.status(201).send({
      org: {
        ...org,
        password: undefined,
      },
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
