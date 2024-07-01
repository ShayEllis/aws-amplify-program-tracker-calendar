// Styles
import './routeError.css'
// React Router
import { useRouteError, useNavigate } from 'react-router-dom'
// MUI
import Box from '@mui/material/Box'

const RouteError = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  const handleReturnToHome = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className='mb-3'>Oh No! - An error has occurred</h2>
      <p>{`${error.status} - ${error.statusText}`}</p>
      <p>{error.data}</p>
      <button onClick={handleReturnToHome}>Return to Home</button>
    </Box>
  )
}

export { RouteError }
