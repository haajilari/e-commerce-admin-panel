// src/components/atoms/Typography/Typography.spec.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Typography, { type TypographyProps } from './Typography' // Adjust if Typography.tsx is in the same folder

describe('Typography Component', () => {
  const defaultProps: TypographyProps = {
    children: 'Hello World',
  }

  it('should render children correctly', () => {
    render(<Typography {...defaultProps} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should render as a <p> tag by default', () => {
    const { container } = render(<Typography {...defaultProps} />)
    expect(container.firstChild?.nodeName).toBe('P')
  })

  it('should render with the specified HTML tag using "as" prop', () => {
    render(<Typography {...defaultProps} as="h1" />)
    const headingElement = screen.getByRole('heading', { level: 1, name: 'Hello World' })
    expect(headingElement).toBeInTheDocument()
    expect(headingElement.tagName).toBe('H1')
  })

  it('should pass through and apply additional className', () => {
    const { container } = render(<Typography {...defaultProps} className="custom-class-test" />)
    expect(container.firstChild).toHaveClass('custom-class-test')
  })
})
