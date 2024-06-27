// Styles
import './settings.css'
// React Router

// React
import { useEffect, useContext } from 'react'
// Utils
import { calendarServer } from '../../utils/calendarServer'
// MUI
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
// State
import { CalendarContext } from '../../context/calendarContexts'

const Settings = () => {
  const state = useContext(CalendarContext)

  useEffect(() => {
    const settingsData = {
      username: state.username,
      programType: 'soft',
      programLength: '75',
      programPhase: 'standard',
    }
    // calendarServer.createCalendarSettings(settingsData)
    // calendarServer.updateCalendarSettings(settingsData)
  }, [])

  return (
    <Box>
      <h2 className='settings-page-title'>Calendar Settings</h2>
      <Box>
        <FormControl fullWidth sx={{ mt: 2 }} size='small'>
          <InputLabel id='program-type'>Program Type</InputLabel>
          <Select
            labelId='program-type'
            id='program-type'
            value={'hard'}
            label='Program Type'
            onChange={'handleChange'}>
            <MenuItem value={'soft'}>Soft</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }} size='small'>
          <InputLabel id='program-length'>Program Length</InputLabel>
          <Select
            labelId='program-length'
            id='program-length'
            value={20}
            label='Program Length'
            onChange={'handleChange'}>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={75}>75</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }} size='small'>
          <InputLabel id='program-phase'>Program Phase</InputLabel>
          <Select
            labelId='program-phase'
            id='program-phase'
            value={'standard'}
            label='Program Phase'
            onChange={'handleChange'}>
            <MenuItem value={'standard'}>Standard</MenuItem>
            <MenuItem value={'phase1'}>Phase 1</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export { Settings }
