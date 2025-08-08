import { getIndividualGoal } from '@/lib/services/goalServices'
import { Goal } from '@/types'
import { Eye } from 'lucide-react'
import { useState } from 'react'

export default function GoalViewer({ userId, goalId }: ViewGoal) {
  const [goal, setGoal] = useState<Goal | null>(null)
  const [loading, setLoading] = useState(false)

  const handleViewGoal = async () => {
    setLoading(true)
    try {
      const userGoal = await getIndividualGoal(userId, goalId)
      setGoal(userGoal)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={handleViewGoal}>
        <Eye className='w-5 h-5' />
      </button>
      {loading && <p>Loading...</p>}
      {goal && <p>{goal.title}</p>}
    </>
  )
}
