// AWS Authentication
import { fetchUserAttributes } from 'aws-amplify/auth'

export const calendarAuth = {
  async fetchPreferredUsername() {
    try {
      const response = await fetchUserAttributes()
      if (!response) throw new Error('Failed to get username')
      return response.preferred_username
    } catch (e) {
      console.error(e.message)
    }
  },
}
