import { calendarServer } from './utils/calendarServer'

const appLoader = () => {
  calendarServer.fetchCalendarDayData().then((response) => {
    return response
  })
}

export { appLoader }
