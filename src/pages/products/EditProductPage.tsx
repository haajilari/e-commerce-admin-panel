// src/pages/products/EditProductPage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Typography, Box, CircularProgress, Alert, Snackbar } from '@mui/material'
import { type FormikHelpers } from 'formik'

import ProductForm from '@/features/products/components/ProductForm'
import { type Product, type ProductFormData } from '@/features/products/types'
import { getProductById, updateProduct } from '@/features/products/services/productServices'
// import { getProductById, updateProduct } from '@/features/products/services/productService' // We'll create these

const EditProductPage: React.FC = () => {
  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>() // Get productId from URL

  const [product, setProduct] = useState<ProductFormData | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true) // For fetching product data
  const [isSubmitting, setIsSubmitting] = useState(false) // For form submission
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!productId) {
      setError('Invalid product ID.')
      setIsLoadingData(false)
      return
    }

    const fetchProduct = async () => {
      setIsLoadingData(true)
      setError(null)
      try {
        console.log(`Fetching product with ID: ${productId}`)
        const fetchedProduct = await getProductById(productId) // Simulated API call
        // const fetchedProduct = await getProductById(productId) // Simulated API call
        if (fetchedProduct) {
          // Convert to form data format if needed
          const formData: ProductFormData = {
            name: fetchedProduct.name,
            description: fetchedProduct.description,
            price: fetchedProduct.price,
            sku: fetchedProduct.sku,
            stockQuantity: fetchedProduct.stockQuantity,
            category: fetchedProduct.category,
            imageUrl: fetchedProduct.imageUrl || '',
            isActive: fetchedProduct.isActive,
            weight: fetchedProduct.weight,
            dimensions: fetchedProduct.dimensions,
            tags: fetchedProduct.tags || [],
          }
          setProduct(formData)
        } else {
          setError(`No product found with ID ${productId}.`)
        }
      } catch (err: any) {
        console.error('Failed to fetch product:', err)
        setError(err.message || 'Error fetching product data.')
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleSubmit = async (
    values: ProductFormData,
    formikHelpers: FormikHelpers<ProductFormData>
  ) => {
    if (!productId) {
      setError('Invalid product ID for update.')
      return
    }
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)
    try {
      console.log(`Updating product ${productId} with:`, values)
      const updatedProduct = await updateProduct(productId, values) // Simulated API call
      console.log('Product updated successfully:', updatedProduct)
      setSuccess(`Product "${updatedProduct.name}" was successfully updated.`)
      setTimeout(() => {
        navigate('/products') // Navigate to product list
      }, 2000)
    } catch (err: any) {
      console.error('Failed to update product:', err)
      setError(err.message || 'Error updating product. Please try again.')
    } finally {
      setIsSubmitting(false)
      formikHelpers.setSubmitting(false)
    }
  }

  if (isLoadingData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading product data...</Typography>
      </Box>
    )
  }

  if (error && !product) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h6">No product found to edit.</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        {success && (
          <Snackbar
            open={!!success}
            autoHideDuration={6000}
            onClose={() => setSuccess(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
              {success}
            </Alert>
          </Snackbar>
        )}
        {error && !success && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <ProductForm
          initialValues={product}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          submitButtonText="Update Product"
          formTitle={`Edit Product: ${product.name}`}
        />
      </Box>
    </Container>
  )
}

export default EditProductPage
