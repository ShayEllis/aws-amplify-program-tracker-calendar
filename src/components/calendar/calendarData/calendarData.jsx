// React
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// Styles
import './calendarData.css'
// Icons
import {
  dietIcon,
  indoorWorkoutIcon,
  noCheatMealIcon,
  outdoorWorkoutIcon,
  progressPictureIcon,
  readIcon,
  waterGallonIcon,
  taskIcon,
  coldShowerIcon,
  activeVisualizationIcon,
} from '../../../assets/icons'

export const CalendarData = ({ date, dayData, programPhase }) => {
  // Create new opject and copy dayData defore destructuring, this prevents an error when dayData is undefined
  const {
    diet,
    indoorWorkout,
    noAlcoholOrCheatMeal,
    oneGallonOfWater,
    outdoorWorkout,
    progressPicture,
    read,
    task1,
    task2,
    task3,
    coldShower,
    activeVisualization,
  } = { ...dayData }
  // Number of checkboxes in the form
  const inputsTrueGoal = programPhase === 'standard' ? 7 : 12

  // Local state to keep track of how many checkboxes are checked
  const [numTrueInputs, setNumTrueInputs] = useState(0)

  // Testing performance
  const dayDataRenders = useRef(0)
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_SHOW_RENDER_COUNTERS === 'true'
  ) {
    dayDataRenders.current = dayDataRenders.current + 1
    console.log(`Day data rendered ${dayDataRenders.current} times.`)
  }

  // Each time the state is changed for a checkbox recacluate how many are checked
  useEffect(() => {
    if (dayData !== undefined) {
      setNumTrueInputs(
        Math.min(Object.values(dayData).filter((inputVal) => inputVal === true).length, inputsTrueGoal)
      )
    }
  }, [dayData])

  return (
    <div
      className='calendarDataContainer'
      style={
        numTrueInputs >= inputsTrueGoal
          ? { backgroundColor: '#F0D0C6' }
          : undefined
      }>
      <div className='dayHeader'>
        <div className='calendarDate'>{date}</div>
        <div className='dayProgressContainer'>
          {numTrueInputs > 0 && (
            <div className='dayProgress'>
              {numTrueInputs}/{inputsTrueGoal}
            </div>
          )}
        </div>
      </div>
      <div className='dayBody'>
        {diet && <img src={dietIcon} alt='follow a diet' className='dayIcon' />}
        {indoorWorkout && (
          <img
            src={indoorWorkoutIcon}
            alt='Indoor workout'
            className='dayIcon'
          />
        )}
        {outdoorWorkout && (
          <img
            src={outdoorWorkoutIcon}
            alt='Progress picture'
            className='dayIcon'
          />
        )}
        {noAlcoholOrCheatMeal && (
          <img src={noCheatMealIcon} alt='No cheat meal' className='dayIcon' />
        )}
        {oneGallonOfWater && (
          <img
            src={waterGallonIcon}
            alt='Outdoor workout'
            className='dayIcon'
          />
        )}
        {progressPicture && (
          <img src={progressPictureIcon} alt='Read' className='dayIcon' />
        )}
        {read && (
          <img src={readIcon} alt='Gallon of water' className='dayIcon' />
        )}
        {programPhase === 'phase1' && task1 && (
          <img src={taskIcon} alt='Gallon of water' className='dayIcon' />
        )}
        {programPhase === 'phase1' && task2 && (
          <img src={taskIcon} alt='Gallon of water' className='dayIcon' />
        )}
        {programPhase === 'phase1' && task3 && (
          <img src={taskIcon} alt='Gallon of water' className='dayIcon' />
        )}
        {programPhase === 'phase1' && coldShower && (
          <img src={coldShowerIcon} alt='Gallon of water' className='dayIcon' />
        )}
        {programPhase === 'phase1' && activeVisualization && (
          <img
            src={activeVisualizationIcon}
            alt='Gallon of water'
            className='dayIcon'
          />
        )}
      </div>
    </div>
  )
}

CalendarData.propTypes = {
  date: PropTypes.number.isRequired,
  dayData: PropTypes.object,
  calendarSettings: PropTypes.object,
  programPhase: PropTypes.string,
}
