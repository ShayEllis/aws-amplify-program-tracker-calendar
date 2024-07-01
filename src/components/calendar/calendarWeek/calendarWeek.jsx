// React
import { memo } from 'react'
import PropTypes from 'prop-types'
// Components
import { CalendarDay } from '../calendarDay/calendarDay'
// Utils
import { getDayIdentifier, calcDaysInWeek } from '../../../utils/utils'

export const CalendarWeek = memo(function CalendarWeek({ days, week }) {
  // Create an array of days in this specific week
  const daysInWeek = calcDaysInWeek(days, week)

  return (
    <tr>
      {daysInWeek.map((day) => {
        return <CalendarDay key={getDayIdentifier(day)} day={day} />
      })}
    </tr>
  )
})

CalendarWeek.propTypes = {
  days: PropTypes.array.isRequired,
  week: PropTypes.number.isRequired,
}
