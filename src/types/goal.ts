export interface Goal {
  title: string
  description: string
  goalType: string
  value: string
  deadline: Date
  status?: 'active' | 'completed'
  createdBy?: string
}
