import { apiClient } from './apiClient'
import { UserProfile } from '@/types/user'

export const fetchUserProfile = async (
  userId: string
): Promise<UserProfile> => {
  try {
    if (!userId) {
      throw new Error('Unauthorized')
    }

    return await apiClient.GET<UserProfile>(`user/${userId}`, {
      cache: 'no-store',
    })
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error
  }
}
