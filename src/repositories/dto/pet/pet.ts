import { Org } from '../org/org'

export interface ResponsePet {
  id: string
  name: string
  description: string
  age: 'cub' | 'adolescent' | 'elderly'
  type: 'cat' | 'dog'
  size: 'small' | 'medium' | 'big'
  lvl_independence: 'medium' | 'low' | 'high'
  org_id: string
  Org?: Org
}
