// src/App.tsx
import { useEffect, useRef } from 'react' // Import useEffect and useRef
import AppRoutes from './routes/AppRoutes'
import useAuthStore from './features/authentication/store/authStore'
import { validateToken } from './features/authentication/services/authService'

function App() {
  const setLoading = useAuthStore((state) => state.setLoading)
  const isLoading = useAuthStore((state) => state.isLoading)
  const logout = useAuthStore((state) => state.logout)
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth)

  // useRef to prevent useEffect from running twice in StrictMode during development
  const effectRan = useRef(true)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && effectRan.current) {
      return
    }
    if (process.env.NODE_ENV === 'production' && effectRan.current) {
      // In production, it should only run once anyway, but this check doesn't harm.
      // However, the double run is a dev-only feature of StrictMode.
      // For production, we might not need this ref check if the effect is truly mount-only.
      // Let's adjust the condition to be more specific for dev StrictMode.
    }

    const initializeAuth = async () => {
      // The token should be rehydrated by zustand/persist by this point.
      // We can directly access it from the store's state.
      const persistedToken = useAuthStore.getState().token // Get latest token from store state

      if (persistedToken) {
        setLoading(true)
        try {
          console.log('App.tsx: Validating token on app load...')
          const userData = await validateToken(persistedToken) // Call our mock API
          hydrateAuth(persistedToken, userData) // Update Zustand store with validated data
          console.log('App.tsx: Token validated, user hydrated.')
        } catch (error) {
          console.error('App.tsx: Token validation failed on app load.', error)
          logout() // Clear invalid token and auth state
        } finally {
          setLoading(false)
        }
      } else {
        // No token found, ensure loading is false if it was somehow set true
        // and the state is already reflecting a logged-out user.
        if (isLoading) setLoading(false) // Only set loading if it was true
        console.log('App.tsx: No token found on app load. User is logged out.')
      }
    }

    // Ensure this runs only once, especially for dev with StrictMode
    if (!effectRan.current || process.env.NODE_ENV === 'production') {
      console.log(
        'debug',
        process.env.NODE_ENV,
        !effectRan.current || process.env.NODE_ENV === 'production'
      )

      initializeAuth()
      if (process.env.NODE_ENV === 'development') {
        effectRan.current = true
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array ensures this runs only once on mount

  return <AppRoutes />
}

export default App
