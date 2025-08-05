import { apiClient } from './apiClient'
import { Goal } from '@/types'

export const postGoal = async (userId: string, goal: Goal): Promise<Goal> => {
  try {
    if (!userId) {
      throw new Error('Unauthorized')
    }

    if (!goal || !goal.title) {
      throw new Error('Goal title is required')
    }

    console.log('Posting goal for user:', userId, 'Goal:', goal)
    const response = await apiClient.POST<Goal>(
      `user/${userId}/goals`,
      { userId, goal },
      {
        cache: 'no-store',
      }
    )
    return response
  } catch (error) {
    console.error('Failed to create goal:', error)
    throw error
  }
}
