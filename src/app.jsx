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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
// Utils
import { calendarServer } from './utils/calendarServer'
import { calendarAuth } from './utils/calendarAuth'

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: '#4E6E58',
    },
  },
})

function App() {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)
  // Spinner displays when data is being fetched from the server
  const [fetchingData, setFetchingData] = useState(true)
  // SignOut function passed from AWS Authenticator
  const signOut = useOutletContext()

  useEffect(() => {
    // Fetch exsisting data from the server
    calendarServer.fetchCalendarDayData().then((response) => {
      if (response) {
        dispatch({ type: 'app/loadCalenderDayData', payload: response })
        setFetchingData(false)
      }

      // Get current username
      calendarAuth.fetchUsername().then((username) => {
        if (username) dispatch({ type: 'app/setUsername', payload: username })
      })
    })
  }, [])

  useEffect(() => {
    if (state.settings.username) {
      // Check for existing calendar settings and set defaults if undefined
      calendarServer.fetchCalendarSettings(state.settings.username).then((response) => {
        if (response) {
          dispatch({ type: 'app/loadCalendarSettings', payload: response })
        } else {
          dispatch({ type: 'app/setDefaultCalendarSettings' })
          calendarServer.createCalendarSettings(state.settings)
        }
      })
    }
  }, [state.settings.username])

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={theme}>
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
            <Navbar signOut={signOut} username={state.settings.username} />
            <Outlet />
          </div>
        </ThemeProvider>
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

export { App }
