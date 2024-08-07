// React
import { useContext, useState, useMemo } from 'react'
// Icons
import Arrow from '../../assets/arrow.png'
// Styles
import './calendar.css'
// Utils
import { generateCalendarDays } from '../../utils/utils'
// Components
import { CalendarWeek } from './calendarWeek/calendarWeek'
import { Modal } from './modal/modal'
import { Confetti } from './confetti/confetti'
import { Stats } from '../stats/stats'
// State
import {
  CalendarContext,
  CalendarDispatchContext,
} from '../../context/calendarContexts'

export const Calendar = () => {
  // Main calendar state and dispatch function
  const state = useContext(CalendarContext)
  const dispatch = useContext(CalendarDispatchContext)
  // Array of days and months that will be used to generate the calendar.
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ]
  // Calculate the number of weeks to show in the calendar
  const weeksInCurrentMonth = useMemo(
    () =>
      Math.ceil(
        (new Date(
          state.calendarMonth.getFullYear(),
          state.calendarMonth.getMonth() + 1,
          0
        ).getDate() +
          new Date(
            state.calendarMonth.getFullYear(),
            state.calendarMonth.getMonth(),
            1
          ).getDay()) /
          7
      ),
    [state.calendarMonth]
  )
  // Use utils function to generate the days in the calender
  const days = useMemo(
    () => generateCalendarDays(state.calendarMonth),
    [state.calendarMonth]
  )
  // Local state to manage when confetti is shown
  const [showConfetti, setShowConfetti] = useState(false)

  const handlePreviousArrowClick = () => {
    dispatch({ type: 'calendar/previousMonth' })
  }

  const handleNextArrowClick = () => {
    dispatch({ type: 'calendar/nextMonth' })
  }

  return (
    <>
      <div className='calendarContainer'>
        <table id='calendar'>
          <thead>
            <tr>
              <th colSpan={7}>
                {showConfetti && (
                  <Confetti onComplete={() => setShowConfetti(false)} />
                )}
                {state.selectedDay && (
                  <Modal
                    selectedDay={state.selectedDay}
                    dayData={state.dayData ? state.dayData : undefined}
                    showConfetti={() => setShowConfetti(true)}
                  />
                )}
                <div className='headingContainer'>
                  <div className='arrowContainer'>
                    <img
                      src={Arrow}
                      alt='Previous Month'
                      className='arrow previousArrow'
                      onClick={handlePreviousArrowClick}
                    />
                  </div>

                  <h2 className='calendarHeading'>
                    {`${
                      months[state.calendarMonth.getMonth()]
                    } ${state.calendarMonth.getFullYear()}`}
                  </h2>
                  <div className='arrowContainer'>
                    <img
                      src={Arrow}
                      alt='Next Month'
                      className='arrow nextArrow'
                      onClick={handleNextArrowClick}
                    />
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              {weekDays.map((day) => (
                <th key={day}>
                  <div className={`dayHeading ${day}`}>{day}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='tableBoday'>
            {Array(weeksInCurrentMonth)
              .fill(null)
              .map((week, idx) => (
                <CalendarWeek
                  key={`${state.calendarMonth.getMonth()}${state.calendarMonth.getFullYear()}${idx}`}
                  days={days}
                  week={idx}
                  calendarMonth={state.calendarMonth}
                  todaysDate={state.todaysDate}
                  dayData={state.dayData}
                  programPhase={state.settings.programPhase}
                />
              ))}
          </tbody>
        </table>
      </div>
      <Stats
        dayData={state.dayData}
        todaysDate={state.todaysDate}
        programLength={state.settings.programLength}
        programStart={state.settings.programStart}
        programPhase={state.settings.programPhase}
        programType={state.settings.programType}
      />
    </>
  )
}
