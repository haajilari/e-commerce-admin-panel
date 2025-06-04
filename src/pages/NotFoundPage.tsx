// src/pages/NotFoundPage.tsx
import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom' // For navigation

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 128px)', // Adjust height based on your layout
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Oops! Page Not Found.
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/" sx={{ mt: 2 }}>
        Go to Homepage
      </Button>
    </Box>
  )
}

export default NotFoundPage
