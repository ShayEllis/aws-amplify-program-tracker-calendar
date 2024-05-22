import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Setup AWS Amplify Backend
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
console.log(outputs)

// Amplify.configure(outputs)

// // Use backend API
import { generateClient } from 'aws-amplify/api'

const client = generateClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
