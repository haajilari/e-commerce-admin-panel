// vite.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
/// <reference types="vitest" /> // This directive adds Vitest's global types

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // Vitest configuration
  test: {
    globals: true, // Enables Jest-compatible global APIs (describe, test, expect, etc.)
    environment: 'jsdom', // Use JSDOM for testing React components
    setupFiles: ['./src/setupTests.ts'], // Path to your setup file (for jest-dom matchers)
    css: true, // If you want to process CSS (e.g. for CSS Modules in tests)
    // reporters: ['verbose'], // Optional: for more detailed output
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/config/theme.ts',
        'src/routes/**/*',
        'src/styles/**/*',
        'src/types/**/*',
        'src/features/**/types/**/*',
        'src/**/__mocks__/**',
        'src/**/*.d.ts',
      ],
    },
  },
})
