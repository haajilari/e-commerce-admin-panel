// src/pages/LoginPage.tsx
import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
// We will add a login form here later

const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Panel Login
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          Login form will be here.
        </Typography>
        {/* TODO: Implement Login Form using Formik and Yup */}
      </Box>
    </Container>
  )
}

export default LoginPage
