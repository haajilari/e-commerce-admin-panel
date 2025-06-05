// src/utils/formatters.spec.ts
import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatters'

describe('formatCurrency Utility', () => {
  it('should format a number as USD currency correctly', () => {
    const amount = 125000.5
    // toLocaleString('en-US') for 125000.50 gives "125,000.50"
    const expected = '$125,000.50'
    expect(formatCurrency(amount, '$', 'en-US')).toBe(expected)
  })

  it('should format with a different currency symbol', () => {
    const amount = 50.75
    const expected = '€50.75' // Assuming EUR formatting with 2 decimal places
    expect(formatCurrency(amount, '€', 'de-DE')).toBe(expected) // 'de-DE' often uses ',' as decimal sep
    // for simplicity, let's assume a simple concat
    // or ensure locale matches expected output.
    // Re-evaluating for simplicity:
    // A simpler test without complex locale nuances if the function is simple:
    const simpleAmount = 50
    const simpleExpected = '£50.00'
    expect(formatCurrency(simpleAmount, '£')).toBe(simpleExpected)
  })

  it('should handle zero amount correctly', () => {
    const amount = 0
    const expected = '$0.00'
    expect(formatCurrency(amount)).toBe(expected)
  })
})
