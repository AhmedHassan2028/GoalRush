import { Goal } from '.'

export interface UserProfile {
  id: string
  email: string
  firstName?: string
  lastName?: string
  createdAt: string
  updatedAt?: string
  fullName?: string
  goals?: Goal[]
}
