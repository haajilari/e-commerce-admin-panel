// src/App.tsx
// ... other imports
import PageHeader from './components/molecules/PageHeader/PageHeader' // Adjust path if needed
import Button from '@mui/material/Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Container from '@mui/material/Container'
import Typography from './components/atoms/Typography/Typography'

function App() {
  return (
    // Make sure ThemeProvider and CssBaseline are wrapping your app in main.tsx or here
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        title="Products Management"
        subtitle="Manage all your e-commerce products, inventory, and details here."
        actions={
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
            Add New Product
          </Button>
        }
      />

      {/* The rest of your page content would go here */}
      <Typography variant="body1">Main content area for product listings, forms, etc.</Typography>

      {/* Example of another header without subtitle or actions */}
      <PageHeader title="User Settings" sx={{ mt: 5 }} />
      <Typography variant="body1">User profile and settings form...</Typography>
    </Container>
  )
}

export default App
