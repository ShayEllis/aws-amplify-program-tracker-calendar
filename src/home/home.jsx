// Styles
import './home.css'
// React Router
import { useNavigate } from 'react-router-dom'
// MUI
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const Home = () => {
  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/main')
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>Hard Program Tracker</h1>
      <Button
        sx={{ mt: 2 }}
        color='secondary'
        variant='contained'
        disableElevation
        onClick={handleSignIn}>
        Sign in
      </Button>
    </Box>
  )
}

export { Home }
