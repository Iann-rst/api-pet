export class OrgNotFoundError extends Error {
  constructor() {
    super('Organização não cadastrada')
  }
}
