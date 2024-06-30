// Styles
import './navbar.css'
// React
import { useState, memo } from 'react'
import PropTypes from 'prop-types'
// React Router
import { Link, useNavigate } from 'react-router-dom'
// Material UI
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

const Navbar = memo(function Navbar({ signOut, username }) {
  const [anchorElement, setAnchorElement] = useState(null)
  const tooltipOpen = Boolean(anchorElement)
  const navigate = useNavigate()

  const handleSettingsClick = ({ currentTarget }) => {
    setAnchorElement(currentTarget)
  }

  const handleTooltipClose = (event) => {
    event.stopPropagation()
    if (event.currentTarget.textContent === 'Settings') {
      navigate('/main/settings')
    }
    if (event.currentTarget.textContent === 'Sign out') {
      signOut()
      navigate('/')
    }
    setAnchorElement(null)
  }

  return (
    <AppBar elevation={0}>
      <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Link to='/main' className='navLink'>
            <Typography>Calendar</Typography>
          </Link>
        </Box>
        <Tooltip title='Open Settings'>
          <IconButton
            size='small'
            aria-controls={tooltipOpen ? 'account-menu' : undefined}
            aria-expanded={tooltipOpen ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleSettingsClick}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#4E6E58' }}>
              {username && username[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Menu
        anchorEl={anchorElement}
        id='account-menu'
        open={tooltipOpen}
        onClose={handleTooltipClose}
        onClick={handleTooltipClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={handleTooltipClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleTooltipClose}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </AppBar>
  )
})

Navbar.propTypes = {
  signOut: PropTypes.func.isRequired,
  username: PropTypes.string,
}

export { Navbar }
