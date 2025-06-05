// src/features/products/components/ProductForm.tsx
import React from 'react'
import { Formik, Form, type FormikHelpers } from 'formik' // Removed Field, ErrorMessage, FieldProps
import * as Yup from 'yup'
import {
  Button,
  Grid,
  Box,
  CircularProgress,
  Typography,
  Paper,
  // MenuItem is now handled inside FormikSelectField
} from '@mui/material'
import { type ProductFormData } from '@/features/products/types'

// Import reusable form controls
import FormikTextField from '@/components/molecules/formControls/FormikTextField'
import FormikSelectField from '@/components/molecules/formControls/FormikSelectField'
import FormikSwitchField from '@/components/molecules/formControls/FormikSwitchField'
import productValidationSchema from '../utils/validationSchemas'

interface ProductFormProps {
  initialValues: ProductFormData
  onSubmit: (
    values: ProductFormData,
    formikHelpers: FormikHelpers<ProductFormData>
  ) => Promise<void> | void
  isLoading?: boolean
  submitButtonText?: string
  formTitle?: string
}

const categories = [
  { value: 'electronics', label: 'Electronic Device' },
  { value: 'books', label: 'Books' },
  { value: 'clothing', label: 'Clothes' },
  { value: 'home-garden', label: 'House and Garden' },
]
const dimensionUnits = [
  { value: 'cm', label: 'Cm' },
  { value: 'inch', label: 'Inch' },
]

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  isLoading = false,
  submitButtonText = 'Save Product',
  formTitle = 'Product Form',
}) => {
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {formTitle}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={productValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(
          { isSubmitting, dirty, isValid, values } // Removed errors, touched from here as fields handle them
        ) => (
          <Form noValidate>
            <Grid container spacing={2}>
              {/* Reduced spacing for a denser form */}
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FormikTextField name="name" label="Product Name" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <FormikTextField name="sku" label="SKU (Product ID)" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormikTextField
                  name="description"
                  label="Product Description"
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FormikTextField name="price" label="Price (Toman)" type="number" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FormikTextField
                  name="stockQuantity"
                  label="Stock Quantity"
                  type="number"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FormikSelectField name="category" label="Category" options={categories} required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormikTextField name="imageUrl" label="Product Image URL" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormikTextField name="weight" label="Weight (kg)" type="number" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }} sx={{ pt: { sm: '28px' } }}>
                {/* Align switch with text fields */}
                <FormikSwitchField
                  name="isActive"
                  label={values.isActive ? 'Product is Active' : 'Product is Inactive'}
                />
              </Grid>
              {/* Dimensions Section */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, mb: 0 }}>
                  Dimensions (Optional)
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FormikTextField name="dimensions.length" label="Length" type="number" />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FormikTextField name="dimensions.width" label="Width" type="number" />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FormikTextField name="dimensions.height" label="Height" type="number" />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FormikSelectField name="dimensions.unit" label="Unit" options={dimensionUnits} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Box sx={{ mt: 3, position: 'relative' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading || isSubmitting || !dirty || !isValid}
                  >
                    {submitButtonText}
                  </Button>
                  {(isLoading || isSubmitting) && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  )
}

export default ProductForm
