import { apiClient } from './apiClient'
import { UserProfile } from '@/types/user'

export const fetchUserProfile = async (
  userId: string
): Promise<UserProfile> => {
  try {
    if (!userId) {
      throw new Error('Unauthorized')
    }

    // For server components, Clerk automatically passes the auth token
    // to your API routes when using same-origin requests
    return await apiClient.GET<UserProfile>(`user?userId=${userId}`, {
      cache: 'no-store',
    })
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error
  }
}
