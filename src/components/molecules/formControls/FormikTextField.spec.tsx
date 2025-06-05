// src/components/molecules/formControls/FormikTextField.spec.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikTextField from './FormikTextField'
import Button from '@mui/material/Button'

const TestFormWrapper = ({
  initialValues,
  validationSchema,
  onSubmit = vi.fn(),
  children,
}: {
  initialValues: any
  validationSchema?: any
  onSubmit?: (values: any) => void
  children: React.ReactNode
}) => (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    <Form>{children}</Form>
  </Formik>
)

describe('FormikTextField Component', () => {
  it('should render with a label and initial English value', () => {
    render(
      <TestFormWrapper initialValues={{ username: 'testuser' }}>
        <FormikTextField name="username" label="Username" />
      </TestFormWrapper>
    )
    const inputElement = screen.getByLabelText(/Username/i) as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    expect(inputElement.value).toBe('testuser')
  })

  it('should update value on user input', async () => {
    const user = userEvent.setup()
    render(
      <TestFormWrapper initialValues={{ email: '' }}>
        <FormikTextField name="email" label="Email Address" type="email" />
      </TestFormWrapper>
    )
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement
    await user.type(emailInput, 'test@example.com')
    expect(emailInput.value).toBe('test@example.com')
  })

  it('should display an English error message when validation fails and field is touched', async () => {
    const user = userEvent.setup()
    const schema = Yup.object({
      description: Yup.string().required('Description is required.'), // English error message
    })
    const handleSubmit = vi.fn()

    render(
      <TestFormWrapper
        initialValues={{ description: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <FormikTextField name="description" label="Product Description" />
        <Button type="submit">Submit</Button>
      </TestFormWrapper>
    )

    const descriptionInput = screen.getByLabelText(/Product Description/i)
    // For some MUI setups and async validation, blurring or submitting might be needed
    await user.click(descriptionInput)
    await user.tab() // Simulate blur to trigger touched state

    // If error doesn't appear immediately on blur, try submitting
    if (!screen.queryByText('Description is required.')) {
      const submitButton = screen.getByRole('button', { name: /Submit/i })
      await user.click(submitButton)
    }

    // Use findByText for elements that might appear asynchronously
    expect(await screen.findByText('Description is required.')).toBeInTheDocument()
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('should not display error message if field is valid or not touched', () => {
    const schema = Yup.object({
      notes: Yup.string().optional(),
    })
    render(
      <TestFormWrapper initialValues={{ notes: 'Some notes' }} validationSchema={schema}>
        <FormikTextField name="notes" label="Additional Notes" />
      </TestFormWrapper>
    )
    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument()
  })
})
