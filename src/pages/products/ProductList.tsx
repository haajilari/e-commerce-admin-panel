// src/pages/products/ProductListPage.tsx
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// ... (MUI imports and Icon imports remain the same)
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

import ReusableTable, {
  type ColumnDefinition,
  type SortConfig,
} from '@/components/organisms/ReusabelTable/ReusableTable'
import { type Product } from '@/features/products/types'
import { getProducts, deleteProduct } from '@/features/products/services/productServices' // getProducts might need adjustment for client-side full fetch
import PageHeader from '@/components/molecules/PageHeader/PageHeader'

const ProductListPage: React.FC = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalProducts, setTotalProducts] = useState(0)
  // totalProducts will now be derived from filtered/sorted data length for client-side pagination

  // Sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig<Product> | null>(null)

  // Column Filtering state - NEW
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})

  // ... (delete confirmation and snackbar states remain the same) ...
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false)
  const [selectedProductIdToDelete, setSelectedProductIdToDelete] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error'
  }>({
    open: false,
    message: '',
    severity: 'success',
  })

  // Fetch ALL products once for client-side filtering/sorting demonstration
  // useEffect(() => {
  //   constfetchAllProducts = async () => {
  //     setIsLoading(true)
  //     setError(null)
  //     try {
  //       // Modify getProducts in service to return all, or fetch with a large limit for this mock
  //       // For this example, assume getProducts can return all if no pagination is heavily enforced by mock
  //       const response = await getProducts({ page: 1, limit: 1000 }) // Fetch a large number to get "all" for mock
  //       setAllProducts(response.products)
  //     } catch (err: any) {
  //       console.error('Failed to fetch products:', err)
  //       setError(err.message || 'Error fetching product list.')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchAllProducts()
  // }, []) // Fetch only once on mount for client-side demo
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
  // Column Filter Change Handler - NEW
  const handleColumnFilterChange = useCallback((columnId: string, value: string) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }))
    setPage(0) // Reset to first page when filters change
  }, [])

  // Sorting Handler
  const handleSortChange = useCallback((sortKey: keyof Product | string) => {
    setSortConfig((currentSortConfig) => {
      let direction: 'asc' | 'desc' = 'asc'
      if (
        currentSortConfig &&
        currentSortConfig.key === sortKey &&
        currentSortConfig.direction === 'asc'
      ) {
        direction = 'desc'
      }
      return { key: sortKey, direction }
    })
    setPage(0) // Reset to first page when sort changes
  }, [])

  // Memoized processed products (filtering and sorting) - NEW / MODIFIED
  const processedProducts = useMemo(() => {
    let filteredItems = [...allProducts]

    // Apply column filters
    Object.entries(columnFilters).forEach(([columnId, filterValue]) => {
      if (filterValue) {
        // Only filter if there's a value
        filteredItems = filteredItems.filter((item) => {
          const itemValue = item[columnId as keyof Product]
          if (itemValue === undefined || itemValue === null) return false
          return String(itemValue).toLowerCase().includes(filterValue.toLowerCase())
        })
      }
    })

    // Apply sorting
    if (sortConfig !== null) {
      filteredItems.sort((a, b) => {
        const valA = a[sortConfig.key as keyof Product]
        const valB = b[sortConfig.key as keyof Product]
        let comparison = 0
        if (typeof valA === 'number' && typeof valB === 'number') {
          comparison = valA - valB
        } else if (typeof valA === 'string' && typeof valB === 'string') {
          comparison = valA.localeCompare(valB, 'en', { sensitivity: 'base' })
        } else if (typeof valA === 'boolean' && typeof valB === 'boolean') {
          comparison = valA === valB ? 0 : valA ? -1 : 1
        }
        return sortConfig.direction === 'asc' ? comparison : comparison * -1
      })
    }
    return filteredItems
  }, [allProducts, columnFilters, sortConfig])

  // Memoized paginated products - NEW
  const paginatedProducts = useMemo(() => {
    const startIndex = page * rowsPerPage
    return processedProducts.slice(startIndex, startIndex + rowsPerPage)
  }, [processedProducts, page, rowsPerPage])

  // Update totalItems for pagination based on filtered data
  const currentTotalItems = processedProducts.length

  // ... (handleChangePage, handleChangeRowsPerPage, CRUD handlers, snackbar handler remain similar,
  // but fetchProducts for delete success should now re-trigger fetching all or re-filter client side)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
      // For client-side demo, we filter out the product from allProducts
      // In a real app, you'd call the API then refetch OR update client state optimistically/after confirm.
      try {
        await deleteProduct(selectedProductIdToDelete) // Still call mock API
        setAllProducts((prev) => prev.filter((p) => p.id !== selectedProductIdToDelete)) // Update client-side master list
        setFeedback({ open: true, message: 'Product successfully deleted.', severity: 'success' })
      } catch (err: any) {
        setFeedback({
          open: true,
          message: err.message || 'Error deleting product.',
          severity: 'error',
        })
      } finally {
        setSelectedProductIdToDelete(null)
        setConfirmDeleteDialogOpen(false)
        // No need to setIsLoading here as it's a client-side list update mostly
      }
    }
  }
  const handleDeleteCancel = () => {
    /* ... */ setSelectedProductIdToDelete(null)
    setConfirmDeleteDialogOpen(false)
  }
  const handleCloseSnackbar = () => {
    /* ... */ setFeedback({ ...feedback, open: false })
  }

  // Define columns - Mark some as filterable
  const columns: ColumnDefinition<Product>[] = [
    { id: 'name', label: 'Product Name', minWidth: 170, sortable: true, filterable: true },
    { id: 'sku', label: 'SKU', minWidth: 100, sortable: true, filterable: true },
    {
      id: 'price',
      label: 'Price (USD)',
      minWidth: 100,
      align: 'right',
      render: (row) => `$${row.price.toFixed(2)}`,
      sortable: true,
      filterable: true /* Filtering numbers as text for now */,
    },
    {
      id: 'stockQuantity',
      label: 'Stock',
      minWidth: 70,
      align: 'center',
      sortable: true,
      filterable: true /* Filtering numbers as text for now */,
    },
    { id: 'category', label: 'Category', minWidth: 100, sortable: true, filterable: true },
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
      sortable:
        true /* Filtering booleans as text 'true'/'false' might be tricky, or needs specific UI */,
    },
  ]

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Product List"
        subtitle="View and manage all e-commerce products."
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
        title="Products Table"
        data={products} // Use paginatedProducts
        columns={columns}
        isLoading={isLoading && allProducts.length === 0} // Show loading only on initial full load
        emptyDataMessage="No products match your filters, or no products available."
        renderRowActions={(row /* ... (same as before) ... */) => (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => row.id && handleEditProduct(row.id)}
              title="Edit"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => row.id && handleDeleteClick(row.id)}
              title="Delete"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        // Pagination props
        totalItems={currentTotalItems} // Use length of filtered and sorted data
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // Sorting props
        sortConfig={sortConfig}
        onSortChange={handleSortChange}
        // Column Filtering props - NEW
        columnFilters={columnFilters}
        onColumnFilterChange={handleColumnFilterChange}
      />

      {/* ... (Delete Confirmation Dialog and Snackbar remain the same) ... */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Product Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
