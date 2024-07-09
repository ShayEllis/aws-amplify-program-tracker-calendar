import { generateClient } from 'aws-amplify/api'
import { removeReadOnlyFields } from './utils'

const client = generateClient()

export const calendarServer = {
  async createCalendarDayData(username, data) {
    const dataWithUsername = {
      username,
      ...data,
    }
    console.log(dataWithUsername)
    try {
      const { data: calendarDayData, errors } =
        await client.models.Calendar.create(dataWithUsername)

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

      if (errors) throw new Error(errors[0].message)
      const filteredCalendarDayData = calendarDayData.map((dayData) =>
        removeReadOnlyFields(dayData)
      )
      return filteredCalendarDayData
    } catch (e) {
      console.error(e)
    }
  },
  async updateCalendarDayData(username, dateString, data) {
    const filteredData = removeReadOnlyFields(data)

    const dayToUpdate = {
      username,
      dateString,
      ...filteredData,
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
  async deleteCalendarDayData(username, dateString) {
    try {
      const { data: deletedLeagueData, errors } =
        await client.models.Calendar.delete({ username, dateString })

      if (errors) throw new Error(errors[0].message)
      console.log('Day data deleted: ', deletedLeagueData)
    } catch (e) {
      console.error(e)
    }
  },
  async createCalendarSettings(settingsData) {
    try {
      const { data: calendarSettings, errors } =
        await client.models.CalendarSettings.create(settingsData)

      if (errors) throw new Error(errors[0].message)
      console.log('Day settings created: ', calendarSettings)
    } catch (e) {
      console.error(e)
    }
  },
  async fetchCalendarSettings(username) {
    try {
      const { data: calendarSettings, errors } =
        await client.models.CalendarSettings.get({ username })

      if (errors) throw new Error(errors[0].message)
      return calendarSettings
    } catch (e) {
      console.error(e)
    }
  },
  async updateCalendarSettings(settingsData) {
    const filteredSettingsData = removeReadOnlyFields(settingsData, false)

    try {
      const { data: calendarSettings, errors } =
        await client.models.CalendarSettings.update(filteredSettingsData)

      if (errors) throw new Error(errors[0].message)
      console.log('Day settings updated: ', calendarSettings)
    } catch (e) {
      console.error(e)
    }
  },
  async deleteCalendarSettings(username) {
    try {
      const { data: calendarSettings, errors } =
        await client.models.CalendarSettings.delete({ username })

      if (errors) throw new Error(errors[0].message)
      console.log('Calendar settings deleted: ', calendarSettings)
    } catch (e) {
      console.error(e)
    }
  },
}
