// src/pages/products/ProductListPage.tsx
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Chip,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { type Product } from '@/features/products/types'
import PageHeader from '@/components/molecules/PageHeader/PageHeader' // Using our PageHeader
import { deleteProduct, getProducts } from '@/features/products/services/productServices'
import type { ColumnDefinition } from '@/components/organisms/ReusabelTable/ReusableTable'
import ReusableTable from '@/components/organisms/ReusabelTable/ReusableTable'

const ProductListPage: React.FC = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [page, setPage] = useState(0) // 0-based index for MUI TablePagination
  const [rowsPerPage, setRowsPerPage] = useState(10) // Default items per page
  const [totalProducts, setTotalProducts] = useState(0)

  // Delete confirmation dialog state
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false)
  const [selectedProductIdToDelete, setSelectedProductIdToDelete] = useState<string | null>(null)

  // Snackbar feedback state
  const [feedback, setFeedback] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error'
  }>({
    open: false,
    message: '',
    severity: 'success',
  })

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // productService.getProducts expects 1-based page, MUI TablePagination uses 0-based
      const response = await getProducts({ page: page + 1, limit: rowsPerPage })
      setProducts(response.products)
      setTotalProducts(response.totalCount)
    } catch (err: any) {
      console.error('Failed to fetch products:', err)
      setError(err.message || 'Error fetching product list.')
    } finally {
      setIsLoading(false)
    }
  }, [page, rowsPerPage])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to first page when rows per page changes
  }

  const handleAddProduct = () => {
    navigate('/products/add')
  }

  const handleEditProduct = (productId: string) => {
    navigate(`/products/edit/${productId}`)
  }

  const handleDeleteClick = (productId: string) => {
    setSelectedProductIdToDelete(productId)
    setConfirmDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedProductIdToDelete) {
      setIsLoading(true)
      try {
        await deleteProduct(selectedProductIdToDelete)
        setFeedback({ open: true, message: 'Product deleted successfully.', severity: 'success' })
        setSelectedProductIdToDelete(null)
        fetchProducts() // Refresh the list
      } catch (err: any) {
        setFeedback({
          open: true,
          message: err.message || 'Error deleting product.',
          severity: 'error',
        })
      } finally {
        setIsLoading(false)
        setConfirmDeleteDialogOpen(false)
      }
    }
  }

  const handleDeleteCancel = () => {
    setSelectedProductIdToDelete(null)
    setConfirmDeleteDialogOpen(false)
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setFeedback({ ...feedback, open: false })
  }

  // Define columns for the ReusableTable
  const columns: ColumnDefinition<Product>[] = [
    { id: 'name', label: 'Product Name', minWidth: 170 },
    { id: 'sku', label: 'SKU', minWidth: 100 },
    {
      id: 'price',
      label: 'Price (Toman)',
      minWidth: 100,
      align: 'right',
      render: (row) => row.price.toLocaleString('fa-IR'),
    },
    { id: 'stockQuantity', label: 'Stock', minWidth: 70, align: 'center' },
    { id: 'category', label: 'Category', minWidth: 100 },
    {
      id: 'isActive',
      label: 'Status',
      minWidth: 80,
      align: 'center',
      render: (row) => (
        <Chip
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          size="small"
        />
      ),
    },
  ]

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Product List"
        subtitle="View and manage all store products."
        actions={
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddProduct}
          >
            Add New Product
          </Button>
        }
      />

      {error && !isLoading && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ReusableTable<Product>
        title="Product Table"
        data={products}
        columns={columns}
        isLoading={isLoading}
        emptyDataMessage="No products found. Start by adding a new one."
        renderRowActions={(row) => (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => row.id && handleEditProduct(row.id)}
              aria-label={`Edit product ${row.name}`}
              title="Edit"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => row.id && handleDeleteClick(row.id)}
              aria-label={`Delete product ${row.name}`}
              title="Delete"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        totalItems={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Product Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={feedback.severity} sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ProductListPage
