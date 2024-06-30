// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// Use normalize to help render elements consistantly across browsers
import 'normalize.css'
import './index.css'
// CSS animation library
import 'animate.css'
// Configure React-Router-Dom
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
// Connect AWS Amplify backend
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
// Configure MUI Theme
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
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

// Configure AWS Amplify
Amplify.configure(outputs)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
