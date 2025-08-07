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
      '/user/goals',
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

export const getGoals = async (userId: string): Promise<Goal[]> => {
  try {
    if (!userId) {
      throw new Error('Unautharized')
    }
    const response = await apiClient.GET<Goal[]>(`user/${userId}/goals`, {
      cache: 'no-store',
    })
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}
