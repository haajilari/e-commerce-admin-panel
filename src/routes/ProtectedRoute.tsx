// src/routes/ProtectedRoute.tsx
import React, { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../features/authentication/store/authStore'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

interface ProtectedRouteProps {
  children: ReactNode // The component/route to render if authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAuthLoading = useAuthStore((state) => state.isLoading)
  const location = useLocation()

  console.log({ isAuthenticated, isAuthLoading })

  // isLoading in authStore can be used to indicate that we are currently
  // trying to validate a token from localStorage (on app initial load).
  // During this phase, we might not want to redirect immediately.
  if (isAuthLoading) {
    // Optional: Show a global loading spinner or a minimal layout
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    console.log('inja biad bad mishe')

    // User is not authenticated, redirect to login page.
    // We pass the current location in state so that after login,
    // we can redirect them back to the page they were trying to access.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // User is authenticated, render the requested route/children.
  return <>{children}</>
}

export default ProtectedRoute
