// React
import { useReducer, useEffect, useState } from 'react'
// React Router
import { Outlet, useOutletContext } from 'react-router-dom'
// Components
import { Navbar } from './components/navbar/navbar'
// Styles
import './app.css'
// State
import { reducer, initialState } from './reducers/appReducer'
import {
  CalendarContext,
  CalendarDispatchContext,
} from './context/calendarContexts'
// Material UI
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// Utils
import { calendarServer } from './utils/calendarServer'
import { calendarAuth } from './utils/calendarAuth'

function App() {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)
  // Spinner displays when data is being fetched from the server
  const [fetchingData, setFetchingData] = useState(true)
  // SignOut function passed from AWS Authenticator
  const auth = useOutletContext()

  useEffect(() => {
    // Fetch exsisting data from the server
    calendarServer.fetchCalendarDayData().then((response) => {
      if (response) {
        dispatch({ type: 'app/loadCalenderDayData', payload: response })
        setFetchingData(false)
      }

      // Get current username
      calendarAuth.fetchPreferredUsername().then((preferredUsername) => {
        if (preferredUsername) {
          dispatch({
            type: 'app/setPreferredUsername',
            payload: preferredUsername,
          })
          dispatch({ type: 'app/setUsername', payload: auth.user.username })
        }
      })
    })
  }, [])

  useEffect(() => {
    if (state.settings.username) {
      // Check for existing calendar settings and set defaults if undefined
      calendarServer
        .fetchCalendarSettings(state.settings.username)
        .then((response) => {
          if (response) {
            dispatch({ type: 'app/loadCalendarSettings', payload: response })
          } else {
            dispatch({ type: 'app/setDefaultCalendarSettings' })
            calendarServer.createCalendarSettings(state.settings)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.settings.username])

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {fetchingData && (
          <Backdrop
            sx={{
              color: '#AFB3F7',
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}>
            <CircularProgress color='inherit' size={85} thickness={2} />
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography variant='caption' component='div' color='inherit'>
                Loading...
              </Typography>
            </Box>
          </Backdrop>
        )}
        <div className='bodyContainer'>
          <Navbar
            signOut={auth.signOut}
            preferredUsername={state.settings.preferredUsername}
          />
          <Outlet />
        </div>
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

export { App }
