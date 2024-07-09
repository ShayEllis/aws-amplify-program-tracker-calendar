// React
import { memo, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// Styles
import './stats.css'
// Components
import { ProgressChart } from './progressChart/progressChart'
// Meterial UI
import Button from '@mui/material/Button'
// Utils
import { getCurrentStreak } from '../../utils/utils'

export const Stats = memo(function Stats({
  dayData,
  todaysDate,
  programLength,
  programStart,
  programPhase,
  programType,
}) {
  const [hideChart, setHideChart] = useState(false)
  const [chartHeight, setChartHeight] = useState()
  const currentStreak = getCurrentStreak(
    dayData,
    todaysDate,
    programStart,
    programPhase,
    programType
  )
  const chartContainerRef = useRef()

  // Testing performance
  const statsRenders = useRef(0)
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_SHOW_RENDER_COUNTERS === 'true'
  ) {
    statsRenders.current = statsRenders.current + 1
    console.log(`Stats rendered ${statsRenders.current} times.`)
  }

  useEffect(() => {
    const handleStatsResize = () => {
      setChartHeight(chartContainerRef.current.getBoundingClientRect().height)
    }
    handleStatsResize()
    window.addEventListener('resize', handleStatsResize)

    return () => window.removeEventListener('resize', handleStatsResize)
  }, [])

  return (
    <div className='statsContainer'>
      <Button
        color='secondary'
        variant='contained'
        disableElevation
        onClick={() => setHideChart(!hideChart)}>
        {hideChart ? 'Show Stats' : 'Hide Stats'}
      </Button>
      <div
        ref={chartContainerRef}
        className='chartContainer'
        style={
          hideChart
            ? { transform: 'scale(0)', marginBottom: `-${chartHeight}px` }
            : undefined
        }>
        {programLength && (
          <ProgressChart goal={programLength} currentStreak={currentStreak} />
        )}
      </div>
    </div>
  )
})

Stats.propTypes = {
  dayData: PropTypes.object,
  todaysDate: PropTypes.object,
  programLength: PropTypes.number,
  programStart: PropTypes.number,
  programPhase: PropTypes.string,
  programType: PropTypes.string,
}
