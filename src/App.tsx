// src/App.tsx
import React from 'react'
import AppRoutes from './routes/AppRoutes' // Import our routes configuration

function App() {
  return (
    // Any global context providers that need to be outside BrowserRouter
    // but inside ThemeProvider can go here if necessary.
    // For now, AppRoutes is enough.
    <AppRoutes />
  )
}

export default App
