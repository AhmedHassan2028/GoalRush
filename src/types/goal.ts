// import { Key } from 'react'

export interface Goal {
  id: string
  // type?: string
  title: string
  description: string
  goalType?: 'time' | 'count' | 'simple'
  value: string
  deadline: Date
  status?: 'active' | 'completed' | 'expired'
  createdBy?: string
  createdAt?: string
  currentValue?: string
}
