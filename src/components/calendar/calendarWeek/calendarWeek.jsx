// React
import { memo, useRef } from 'react'
import PropTypes from 'prop-types'
// Components
import { CalendarDay } from '../calendarDay/calendarDay'
// Utils
import { getDayIdentifier, calcDaysInWeek } from '../../../utils/utils'

export const CalendarWeek = memo(function CalendarWeek({
  days,
  week,
  calendarMonth,
  todaysDate,
  dayData,
  programPhase,
}) {
  // Create an array of days in this specific week
  const daysInWeek = calcDaysInWeek(days, week)

  // Testing performance
  const weekRenders = useRef(0)
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_SHOW_RENDER_COUNTERS === 'true'
  ) {
    weekRenders.current = weekRenders.current + 1
    console.log(`Week rendered ${weekRenders.current} times.`)
  }

  return (
    <tr>
      {daysInWeek.map((day) => {
        return (
          <CalendarDay
            key={getDayIdentifier(day)}
            day={day}
            calendarMonth={calendarMonth}
            todaysDate={todaysDate}
            dayData={dayData[getDayIdentifier(day)]}
            programPhase={programPhase}
          />
        )
      })}
    </tr>
  )
})

CalendarWeek.propTypes = {
  days: PropTypes.array.isRequired,
  week: PropTypes.number.isRequired,
  calendarMonth: PropTypes.object.isRequired,
  todaysDate: PropTypes.object.isRequired,
  dayData: PropTypes.object,
  programPhase: PropTypes.string,
}
