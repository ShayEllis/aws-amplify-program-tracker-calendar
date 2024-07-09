// React
import { memo, useRef, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
// Chart Library
import { Chart } from 'chart.js/auto'
// Styles
import './progressChart.css'

export const ProgressChart = memo(function ProgressChart ({ goal, currentStreak }) {
  const canvasRef = useRef()
  const chartRef = useRef()

  // Testing performance
  const chartRenders = useRef(0)
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_SHOW_RENDER_COUNTERS === 'true'
  ) {
    chartRenders.current = chartRenders.current + 1
    console.log(`Chart rendered ${chartRenders.current} times.`)
  }

  const chartData = [currentStreak, goal - currentStreak]
  const chartLables = [
    `${chartData[0]} - Complete`,
    `${chartData[1]} - Remaining`,
  ]

  const data = {
    labels: chartLables,
    datasets: [
      {
        label: 'Days',
        data: chartData,
        backgroundColor: ['#F0D0C6', '#B3B4B3'],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  }

  const renderChart = () => {
    chartRef.current = new Chart(canvasRef.current, {
      data: data,
      type: 'doughnut',
      options: {
        layout: {
          padding: {
            bottom: 20,
          },
        },
      },
    })
  }

  const destroyChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }
  }

  useLayoutEffect(() => {
    renderChart()
    return () => {
      destroyChart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    chartRef.current.data.labels = chartLables
    chartRef.current.data.datasets[0].data = chartData
    chartRef.current.update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, currentStreak])

  return (
    <div className='progressChartContainer'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
})

ProgressChart.propTypes = {
  goal: PropTypes.number.isRequired,
  currentStreak: PropTypes.number.isRequired,
}
