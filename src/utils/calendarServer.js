import { generateClient } from 'aws-amplify/api'

const client = generateClient()

export const calendarServer = {
  async createCalendarDayData(data) {
    // const options = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // }
    // try {
    //   const response = await fetch(apiURI, options)
    //   if (!response.ok) throw new Error(await response.text())
    //   return true
    // } catch (e) {
    //   console.error(e.message)
    // }
  },
  async fetchCalendarDayData() {
    try {
      const { data: calendarDayData, errors } = await client.models.Calendar.list()
      if (errors) throw new Error(errors)
      return calendarDayData
    } catch (e) {
      console.log(e)
    }
  },
  async updateCalendarDayData(dateString, data) {
    // const options = {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // }
    // try {
    //   const response = await fetch(`${apiURI}/${dateString}`, options)
    //   if (!response.ok) throw new Error(await response.text())
    //   return true
    // } catch (e) {
    //   console.error(e.message)
    // }
  },
  async deleteCalendarDayData(dateString) {
    // const options = {
    //   method: 'DELETE',
    // }
    // try {
    //   const response = await fetch(`${apiURI}/${dateString}`, options)
    //   if (!response.ok) throw new Error(await response.text())
    //   return true
    // } catch (e) {
    //   console.error(e.message)
    // }
  },
}
