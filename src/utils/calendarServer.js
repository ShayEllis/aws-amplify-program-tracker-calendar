import { generateClient } from 'aws-amplify/api'

const client = generateClient()

export const calendarServer = {
  async createCalendarDayData(data) {
    try {
      const { data: calendarDayData, errors } =
        await client.models.Calendar.create(data)
      if (errors) throw new Error(errors[0].message)
      console.log('Day data created: ', calendarDayData)
    } catch (e) {
      console.error(e)
    }
  },
  async fetchCalendarDayData() {
    try {
      const { data: calendarDayData, errors } =
        await client.models.Calendar.list()
      console.log('fetch', calendarDayData, errors)
      if (errors) throw new Error(errors[0].message)
      return calendarDayData
    } catch (e) {
      console.log(e)
    }
  },
  async updateCalendarDayData(dateString, data) {
    const dayToUpdate = {
      dateString,
      ...data,
    }
    try {
      const { data: updatedCalendarData, errors } =
        await client.models.Calendar.update(dayToUpdate)

      if (errors) throw new Error(errors[0].message)
      console.log('Day Data updated: ', updatedCalendarData)
    } catch (e) {
      console.error(e)
    }
  },
  async deleteCalendarDayData(dateString) {
    const dayToDelete = { dateString }
    try {
      const { data: deletedLeagueData, errors } =
        await client.models.Calendar.delete(dayToDelete)

      if (errors) throw new Error(errors[0].message)
      console.log('Day data deleted: ', deletedLeagueData)
    } catch (e) {
      console.error(e)
    }
  },
}
