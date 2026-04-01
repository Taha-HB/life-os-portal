import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Create root element and render the app
const rootElement = document.getElementById('root')

// Check if root element exists
if (!rootElement) {
  throw new Error('Failed to find the root element. Please make sure index.html has a div with id="root"')
}

// Create React root and render
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
