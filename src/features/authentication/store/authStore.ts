import { create } from 'zustand'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { validateToken } from '../services/authService'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  loginSuccess: (userData: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  hydrateAuth: (token: string, userData: User) => void
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,
      loginSuccess: (userData, token) =>
        set({
          isAuthenticated: true,
          user: userData,
          token: token,
          isLoading: false,
          error: null,
        }),
      logout: () => set({ ...initialState }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),
      clearError: () => set({ error: null }),
      hydrateAuth: (token, userData) =>
        set({
          isAuthenticated: true,
          token: token,
          user: userData,
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Error rehydrating auth store:', error)
          return
        }
        if (state?.token) {
          state.setLoading(true)
          validateToken(state.token)
            .then((userData) => {
              state.hydrateAuth(state.token!, userData)
            })
            .catch((err) => {
              console.error('Token validation failed during hydration:', err)
              state.logout()
            })
            .finally(() => {
              state.setLoading(false)
            })
        }
      },
    }
  )
)

export default useAuthStore
