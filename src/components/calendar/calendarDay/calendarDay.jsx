// React
import { memo, useMemo, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
// Styles
import './calendarDay.css'
// Utils
import { CalendarData } from '../calendarData/calendarData'
import { getDayIdentifier } from '../../../utils/utils'
// State
import { CalendarDispatchContext } from '../../../context/calendarContexts'

export const CalendarDay = memo(function CalendarDay({
  day,
  calendarMonth,
  todaysDate,
  dayData,
  programPhase,
}) {
  // Main calendar state and dispatch function
  const dispatch = useContext(CalendarDispatchContext)

  // Testing performance
  const dayRenders = useRef(0)
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_SHOW_RENDER_COUNTERS === 'true'
  ) {
    dayRenders.current = dayRenders.current + 1
    console.log(`Day rendered ${dayRenders.current} times.`)
  }

  const handleDayClick = (day) => {
    const dayIdentifier = getDayIdentifier(day)

    dispatch({ type: 'day/dayClick', payload: dayIdentifier })
  }

  // Set differnet styles for the current day of the month and any days that are not part of the current month
  const classes = useMemo(() => {
    if (calendarMonth.getMonth() !== day.getMonth()) {
      return 'notCurrentMonth calendarCell'
    } else if (getDayIdentifier(todaysDate) === getDayIdentifier(day)) {
      return 'currentDate calendarCell'
    } else if (day.getTime() > todaysDate.getTime()) {
      return 'futureDate calendarCell'
    } else {
      return 'calendarCell'
    }
  }, [day, todaysDate, calendarMonth])

  return (
    <td className='calendarCellContainer'>
      <div className={classes} onClick={() => handleDayClick(day)}>
        <CalendarData
          date={day.getDate()}
          dayData={dayData}
          programPhase={programPhase}
        />
      </div>
    </td>
  )
})

CalendarDay.propTypes = {
  day: PropTypes.object.isRequired,
  calendarMonth: PropTypes.object.isRequired,
  todaysDate: PropTypes.object.isRequired,
  dayData: PropTypes.object,
  programPhase: PropTypes.string,
}
