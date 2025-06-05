// src/pages/LoginPage.spec.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom' // For providing router context
import LoginPage from './LoginPage'
import useAuthStore from '@/features/authentication/store/authStore' // To check store state changes
import * as authService from '@/features/authentication/services/authService' // To mock loginUser

// Mock the authService
vi.mock('@/features/authentication/services/authService', async (importOriginal) => {
  const actual = await importOriginal<typeof authService>()
  return {
    ...actual,
    loginUser: vi.fn(), // Mock the loginUser function
  }
})

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('LoginPage Integration Tests', () => {
  const initialAuthState = useAuthStore.getState()

  beforeEach(() => {
    // Reset mocks and store state before each test
    vi.clearAllMocks() // Clears all mocks
    useAuthStore.setState(initialAuthState, true) // Reset Zustand store to initial state
  })

  it('should allow a user to log in successfully and navigate to dashboard', async () => {
    const user = userEvent.setup()
    const mockLoginUser = authService.loginUser as ReturnType<typeof vi.fn> // Typed mock

    // Simulate successful login response
    mockLoginUser.mockResolvedValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      token: 'mock-token-123',
    })

    render(
      <BrowserRouter>
        {' '}
        {/* LoginPage uses useNavigate, so it needs a Router context */}
        <LoginPage />
      </BrowserRouter>
    )

    await user.type(screen.getByLabelText(/Email Address/i), 'test@example.com')
    await user.type(screen.getByLabelText(/Password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /Sign In/i }))

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledTimes(1)
      expect(mockLoginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })

    // Check if Zustand store was updated (this might require more specific setup or direct inspection)
    // For simplicity, we'll trust the call to loginSuccess was made implicitly by loginUser success.
    // A more direct way is to check the state AFTER the successful call.
    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true)
      expect(useAuthStore.getState().user?.email).toBe('test@example.com')
    })

    // Check for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/') // Assuming successful login navigates to '/'
    })
  })

  it('should display an error message on login failure', async () => {
    const user = userEvent.setup()
    const mockLoginUser = authService.loginUser as ReturnType<typeof vi.fn>

    // Simulate login failure
    const errorMessage = 'Invalid credentials provided.'
    mockLoginUser.mockRejectedValue(new Error(errorMessage))

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    await user.type(screen.getByLabelText(/Email Address/i), 'wrong@example.com')
    await user.type(screen.getByLabelText(/Password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /Sign In/i }))

    // Wait for error message to appear
    expect(await screen.findByText(errorMessage)).toBeInTheDocument() // Check for English error message

    // Check that store reflects failure
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().error).toBe(errorMessage)
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
