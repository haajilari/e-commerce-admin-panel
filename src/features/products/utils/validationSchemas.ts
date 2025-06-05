import * as Yup from 'yup'

const productValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name cannot exceed 100 characters')
    .required('Product name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters')
    .required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number') // Handles cases where input is not a number
    .positive('Price must be a positive number')
    .required('Price is required'),
  sku: Yup.string()
    .matches(/^[a-zA-Z0-9-]+$/, 'SKU can only contain letters, numbers, and hyphens')
    .min(3, 'SKU must be at least 3 characters')
    .max(50, 'SKU cannot exceed 50 characters')
    .required('SKU is required'),
  stockQuantity: Yup.number()
    .typeError('Stock quantity must be a number')
    .integer('Stock quantity must be an integer')
    .min(0, 'Stock quantity cannot be negative')
    .required('Stock quantity is required'),
  category: Yup.string().required('Category is required'),
  imageUrl: Yup.string().url('Please enter a valid URL for the image').optional(), // or .notRequired() - makes it optional
  isActive: Yup.boolean().required('Active status is required'),
  tags: Yup.array().of(Yup.string().min(2, 'Tag must be at least 2 characters')).optional(),
  weight: Yup.number()
    .typeError('Weight must be a number')
    .positive('Weight must be positive')
    .optional(),
  dimensions: Yup.object()
    .shape({
      length: Yup.number().positive('Length must be positive').optional(),
      width: Yup.number().positive('Width must be positive').optional(),
      height: Yup.number().positive('Height must be positive').optional(),
      unit: Yup.string().oneOf(['cm', 'inch']).optional(),
    })
    .optional(),
})

export default productValidationSchema
// Note: For nested objects like 'dimensions', if the whole 'dimensions' object is optional,
// but if it *is* provided, then its internal fields (length, width, etc.) are required,
// Yup's .optional() on the parent object and .required() on children handles this well.
// If a field like 'dimensions' is not provided at all, its inner validations won't run.
