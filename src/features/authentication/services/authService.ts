// src/features/authentication/services/authService.ts

// Define types for credentials and API responses
export interface LoginCredentials {
  email: string
  password: string
}

export interface UserProfile {
  // This can be the same as User interface in authStore
  id: string
  name: string
  email: string
  // roles?: string[];
}

export interface AuthResponse {
  user: UserProfile
  token: string
}

// Hardcoded user credentials for simulation
const MOCK_USER_EMAIL = 'admin@admin'
const MOCK_USER_PASSWORD = '123456'
const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-123-abc',
  name: 'Admin User',
  email: MOCK_USER_EMAIL,
  // roles: ['ADMIN', 'EDITOR'],
}
// This is a very simple mock token. In a real app, this would be a JWT.
const MOCK_AUTH_TOKEN = 'fake-jwt-token-for-admin-user-ecommerce-panel'

const SIMULATION_DELAY = 1000 // 1 second delay to simulate network latency

/**
 * Simulates a user login API call.
 * Accepts user credentials and returns user profile and a token upon successful authentication.
 *
 * @param credentials - The user's email and password.
 * @returns A Promise that resolves with AuthResponse (user profile and token) on success.
 * @rejects An Error if login fails due to invalid credentials or other issues.
 *
 * @example
 * loginUser({ email: "user@example.com", password: "password123" })
 * .then(response => console.log(response.user, response.token))
 * .catch(error => console.error(error.message));
 */
export const loginUser = (credentials: LoginCredentials): Promise<AuthResponse> => {
  console.log({ loginUser: credentials })
  return new Promise((resolve, reject) => {
    console.log(`authService: Simulating login for ${credentials.email}...`)
    setTimeout(() => {
      if (credentials.email === MOCK_USER_EMAIL && credentials.password === MOCK_USER_PASSWORD) {
        console.log('authService: Login successful.')
        resolve({
          user: MOCK_USER_PROFILE,
          token: MOCK_AUTH_TOKEN,
        })
      } else {
        console.error('authService: Login failed. Invalid credentials.')
        reject(new Error('Invalid email or password. Please try again.'))
      }
    }, SIMULATION_DELAY)
  })
}

/**
 * Simulates validating an authentication token.
 * In a real app, this would make an API call to the backend to verify the token.
 * @param token - The authentication token to validate.
 * @returns A Promise that resolves with UserProfile if the token is valid, or rejects with an Error.
 */
export const validateToken = (token: string): Promise<UserProfile> => {
  console.log({ validateToken: token })

  return new Promise((resolve, reject) => {
    console.log(
      `authService: Simulating token validation for token: ${token ? token.substring(0, 10) + '...' : 'null'}`
    )
    setTimeout(() => {
      if (token === MOCK_AUTH_TOKEN) {
        console.log('authService: Token validation successful.')
        resolve(MOCK_USER_PROFILE)
      } else {
        console.error('authService: Token validation failed. Invalid token.')
        reject(new Error('Invalid or expired session. Please log in again.'))
      }
    }, SIMULATION_DELAY / 2) // Shorter delay for token validation
  })
}

/**
 * Simulates a user logout API call.
 * In a real app, this might invalidate the token on the server-side.
 * For our mock, it doesn't need to do much beyond resolving.
 * @returns A Promise that resolves when logout is "complete".
 */
export const logoutUser = (): Promise<void> => {
  console.log('authService: Simulating server-side logout...')

  return new Promise((resolve) => {
    console.log('authService: Simulating server-side logout...')
    setTimeout(() => {
      console.log('authService: Server-side logout processed.')
      resolve()
    }, SIMULATION_DELAY / 4)
  })
}
