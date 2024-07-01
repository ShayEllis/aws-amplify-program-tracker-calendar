// Styles
import './settings.css'
// React Router
import { useNavigate } from 'react-router-dom'
// React
import { useContext } from 'react'
// Utils
import { calendarServer } from '../../utils/calendarServer'
import dayjs from 'dayjs'
// MUI
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// State
import {
  CalendarContext,
  CalendarDispatchContext,
} from '../../context/calendarContexts'

const Settings = () => {
  const state = useContext(CalendarContext)
  const dispatch = useContext(CalendarDispatchContext)
  const navigate = useNavigate()

  const handleSettingInputChange = ({ target }) => {
    const allowedInputNames = ['programType', 'programLength', 'programPhase']
    if (allowedInputNames.includes(target.name)) {
      dispatch({
        type: 'app/changeSettingValues',
        payload: { inputName: target.name, value: target.value },
      })
      calendarServer.updateCalendarSettings({
        ...state.settings,
        [target.name]: target.value,
      })
    } else {
      console.error(`No input with the name '${target.name}'`)
    }
  }

  const handleSettingsDateChange = (event) => {
    dispatch({
      type: 'app/changeSettingValues',
      payload: { inputName: 'programStart', value: event.valueOf() },
    })
    calendarServer.updateCalendarSettings({
      ...state.settings,
      programStart: event.valueOf(),
    })
  }

  const handleSaveButtonClick = () => {
    navigate('/main')
  }

  return (
    <Box sx={{ width: '250px' }}>
      <h2 className='settings-page-title'>Calendar Settings</h2>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: '100%' }}
            label='Program Start'
            value={
              state.settings.programStart === undefined
                ? null
                : dayjs(state.settings.programStart)
            }
            onChange={handleSettingsDateChange}
          />
        </LocalizationProvider>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id='program-type'>Program Type</InputLabel>
          <Select
            labelId='program-type'
            id='program-type'
            value={state.settings.programType || ''}
            label='Program Type'
            name='programType'
            onChange={handleSettingInputChange}>
            <MenuItem value={'soft'}>Soft</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id='program-length'>Program Length</InputLabel>
          <Select
            labelId='program-length'
            id='program-length'
            value={state.settings.programLength || ''}
            label='Program Length'
            name='programLength'
            onChange={handleSettingInputChange}>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={75}>75</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id='program-phase'>Program Phase</InputLabel>
          <Select
            labelId='program-phase'
            id='program-phase'
            value={state.settings.programPhase || ''}
            label='Program Phase'
            name='programPhase'
            onChange={handleSettingInputChange}>
            <MenuItem value={'standard'}>Standard</MenuItem>
            <MenuItem value={'phase1'}>Phase 1</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ mt: 2, width: '100%' }}
          color='secondary'
          variant='contained'
          disableElevation
          onClick={handleSaveButtonClick}>
          Save
        </Button>
      </Box>
    </Box>
  )
}

export { Settings }
