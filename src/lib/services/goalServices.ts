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

export const getGoals = async (userId: string): Promise<Goal[]> => {
  try {
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const response = await apiClient.GET<{ goals: Goal[] }>(
      `user/${userId}/goals`,
      { cache: 'no-store' }
    )

    return response.goals
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const getIndividualGoal = async (
  userId: string,
  goalsId: string
): Promise<Goal> => {
  try {
    if (!userId || !goalsId) {
      throw new Error('Unauthorized')
    }

    const response = await apiClient.GET<{ goal: Goal }>(
      `user/${userId}/goals/${goalsId}`,
      { cache: 'no-store' }
    )

    if (!response || !response.goal) {
      throw new Error('Goal not found')
    }

    return response.goal
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteGoal = async (
  userId: string,
  goalsId: string
): Promise<void> => {
  if (!userId || !goalsId) {
    throw new Error('Unauthorized')
  }

  await apiClient.DELETE<void>(`user/${userId}/goals/${goalsId}`)
}

export const updateIndividualGoal = async (
  userId: string,
  goalsId: string,
  updates: Partial<Goal>
): Promise<Goal> => {
  try {
    if (!userId || !goalsId) {
      throw new Error('Unauthorized: Missing userId or goalsId')
    }

    console.log('PATCH request to:', `user/${userId}/goals/${goalsId}`, updates)

    const response = await apiClient.PATCH<{ goal?: Goal; error?: string }>(
      `user/${userId}/goals/${goalsId}`,
      updates,
      { cache: 'no-store' }
    )

    if (!response) {
      throw new Error('No response from server')
    }

    if (response.error) {
      throw new Error(`Server error: ${response.error}`)
    }

    if (!response.goal) {
      throw new Error('Goal not found in server response')
    }

    return response.goal
  } catch (error: unknown) {
    console.error('updateIndividualGoal failed:', error)
    throw error
  }
}
