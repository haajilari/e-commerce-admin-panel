// src/pages/LoginPage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup' // For validation schema

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField' // MUI TextField
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress' // For loading state
import Alert from '@mui/material/Alert' // For displaying errors

import useAuthStore from '../features/authentication/store/authStore'
import { loginUser, type LoginCredentials } from '../features/authentication/services/authService'

// Validation Schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { loginSuccess, setLoading, setError, isLoading, error: authError } = useAuthStore()

  const initialValues: LoginCredentials = {
    email: '',
    password: '',
  }

  const handleSubmit = async (
    values: LoginCredentials,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setLoading(true)
    setError(null) // Clear previous errors
    try {
      const response = await loginUser(values) // Call our mock API
      loginSuccess(response.user, response.token) // Update Zustand store
      // The persist middleware in Zustand handles saving to localStorage
      navigate('/') // Redirect to dashboard or main page
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
      setSubmitting(false) // Inform Formik that submission is complete
    }
  }

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Panel Login
        </Typography>

        {authError && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {authError}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, dirty, isValid }) => (
            <Form noValidate style={{ width: '100%', marginTop: '1rem' }}>
              <Field
                as={TextField} // Use MUI TextField as the input component
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email" // This name must match initialValues and LoginSchema
                autoComplete="email"
                autoFocus
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password" // This name must match initialValues and LoginSchema
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {/* We can use <ErrorMessage name="fieldName" component="div" className="error-message-class" />
                  but MUI TextField's helperText is often sufficient */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, position: 'relative' }}
                disabled={isLoading || isSubmitting || !dirty || !isValid} // Disable button states
              >
                {isLoading || isSubmitting ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'primary.contrastText',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
}

export default LoginPage
