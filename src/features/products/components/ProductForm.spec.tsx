// src/features/products/components/ProductForm.spec.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from './ProductForm' // Assuming ProductForm uses English validation messages from its Yup schema
import { type ProductFormData } from '@/features/products/types'

const mockSubmit = vi.fn((values: ProductFormData) => Promise.resolve())

const initialProductValues: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  sku: '',
  stockQuantity: 0,
  category: '',
  imageUrl: '',
  isActive: true,
  weight: undefined,
  dimensions: undefined,
  tags: [],
}

describe('ProductForm Integration Tests', () => {
  beforeEach(() => {
    mockSubmit.mockClear() // Clear mock call history before each test
  })

  it('should allow a user to fill out and submit the form with valid data', async () => {
    const user = userEvent.setup()
    render(
      <ProductForm
        initialValues={initialProductValues}
        onSubmit={mockSubmit}
        formTitle="Create New Product"
        submitButtonText="Create Product"
      />
    )

    // Fill out the form
    await user.type(screen.getByLabelText(/Product Name/i), 'Awesome Laptop X1')
    await user.type(screen.getByLabelText(/SKU/i), 'LPX1-001')
    await user.type(
      screen.getByLabelText(/Description/i),
      'A very awesome laptop with great features.'
    )
    // For MUI TextField with type="number", clear then type
    const priceInput = screen.getByLabelText(/Price/i)
    await user.clear(priceInput)
    await user.type(priceInput, '1200')

    const stockInput = screen.getByLabelText(/Stock Quantity/i)
    await user.clear(stockInput)
    await user.type(stockInput, '50')

    // Select a category (MUI Select interaction)
    await user.click(screen.getByLabelText(/Category/i))
    await user.click(await screen.findByRole('option', { name: /Electronics/i })) // Assuming 'Electronics' is an option

    // Click the isActive switch (assuming its default is true, click to make it false then true again if needed)
    // For simplicity, we'll leave it as default or assume it's set.

    await user.click(screen.getByRole('button', { name: /Create Product/i }))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1)
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Awesome Laptop X1',
          sku: 'LPX1-001',
          description: 'A very awesome laptop with great features.',
          price: 1200,
          stockQuantity: 50,
          category: 'electronics', // Value of the selected category
          isActive: true, // Default or as set
        }),
        expect.anything() // For formikHelpers
      )
    })
  })

  it('should display validation errors for required fields if submitted empty', async () => {
    const user = userEvent.setup()
    render(
      <ProductForm
        initialValues={initialProductValues}
        onSubmit={mockSubmit}
        formTitle="Test Product Form"
        submitButtonText="Submit"
      />
    )

    await user.click(screen.getByRole('button', { name: /Submit/i }))

    // Check for English error messages (assuming Yup schema is configured with English messages)
    expect(await screen.findByText('Product name is required')).toBeInTheDocument()
    expect(await screen.findByText('Description is required')).toBeInTheDocument()
    expect(await screen.findByText('Price is required')).toBeInTheDocument()
    expect(await screen.findByText('SKU is required')).toBeInTheDocument()
    expect(await screen.findByText('Stock quantity is required')).toBeInTheDocument()
    expect(await screen.findByText('Category is required')).toBeInTheDocument()

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('should display validation error for invalid price format', async () => {
    const user = userEvent.setup()
    render(
      <ProductForm
        initialValues={{
          ...initialProductValues,
          name: 'Test Name',
          sku: 'Test-SKU',
          description: 'Test Desc',
          stockQuantity: 10,
          category: 'books',
        }}
        onSubmit={mockSubmit}
        submitButtonText="Submit"
      />
    )

    const priceInput = screen.getByLabelText(/Price/i)
    await user.type(priceInput, 'not-a-number') // Invalid input
    await user.click(screen.getByRole('button', { name: /Submit/i })) // Attempt to submit

    expect(await screen.findByText('Price must be a number')).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })
})
