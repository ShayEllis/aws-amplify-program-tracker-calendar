import { generateClient } from 'aws-amplify/api'

const client = generateClient()

export const calendarServer = {
  async createCalendarDayData(data) {
    console.log('create')
 
    const {data: calendarDayData, errors} = await client.models.Calendar.create(data)

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
  subscribeToCalendarQuery(setStateFunc) {
    const action = {type: 'app/loadCalenderDayData', payload: []}
    console.log('subscribed to Calendar')

    return client.models.Calendar.observeQuery().subscribe({
      next: ({items, isSynced}) => {
        action.payload = items
        setStateFunc(action)
      }
    })
  },
  async fetchCalendarDayData() {
    try {
      const { data: calendarDayData, errors } = await client.models.Calendar.list()
      console.log('fetch', calendarDayData, errors)
      if (errors) throw new Error(errors)
      return calendarDayData
    } catch (e) {
      console.log(e)
    }
  },
  async updateCalendarDayData(dateString, data) {
    const dayToUpdate = {
      dateString,
      ...data
    }
    console.log('update', dayToUpdate)
    // const {data: updatedCalendarData, errors} = await client.models.Calendar.update(dayToUpdate)
    // console.log('update', updatedCalendarData, errors)

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
  async deleteCalendarDayData(dayId) {
    console.log('delete')
    const dayToDelete = {id: dayId} // **may need to use auto generated ID instead**
    const response = await client.models.Calendar.delete(dayToDelete)

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
