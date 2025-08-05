import { GoalInfo } from '@/types/goal'
import { apiClient } from './apiClient'

export const createUserGoal = async (
  userId: string,
  goal: GoalInfo
): Promise<GoalInfo> => {
  try {
    if (!goal) {
      throw new Error('Unauthorized')
    }

    // For server components, Clerk automatically passes the auth token
    // to your API routes when using same-origin requests
    return await apiClient.post<GoalInfo>(`user?userId=${userId}/goals`, {
      cache: 'no-store',
    })
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error
  }
}
