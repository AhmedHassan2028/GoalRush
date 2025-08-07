import { Key } from 'react'

export interface Goal {
  id: Key | null | undefined
  type: string
  title: string
  description: string
  goalType: string
  value: string
  deadline: Date
  status?: 'active' | 'completed'
  createdBy?: string
}
