// Styles
import './settings.css'
// React Router

// React
import { useEffect } from 'react'

// Utils
import { calendarServer } from '../../utils/calendarServer'

const Settings = () => {
  useEffect(() => {
    const settingsData = {
      username: 'Sellis815',
      programType: 'soft',
    }
    // calendarServer.createCalendarSettings(settingsData)
    // calendarServer.updateCalendarSettings(settingsData)

  }, [])

  return (
    <div>
      <h2>Test Settings</h2>
    </div>
  )
}

export { Settings }
