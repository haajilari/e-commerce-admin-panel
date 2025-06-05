// src/routes/AppRoutes.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AdminLayout from '@/layouts/AdminLayout/AdminLayout'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProtectedRoute from './ProtectedRoute'

// Import product pages
import AddProductPage from '@/pages/products/AddProductPage'
import EditProductPage from '@/pages/products/EditProductPage'
import ProductListPage from '@/pages/products/ProductList'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes Wrapper */}
      <Route
        path="/" // This remains the parent for all admin routes
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} /> {/* Default page at "/" is Dashboard */}
        {/* Product Management Routes */}
        <Route path="products" element={<ProductListPage />} /> {/* Main product listing */}
        <Route path="products/add" element={<AddProductPage />} />
        <Route path="products/edit/:productId" element={<EditProductPage />} />
        {/* TODO: Add other protected routes here (e.g., orders, inventory, settings) */}
        {/* <Route path="inventory" element={<div>Inventory Page Placeholder</div>} /> */}
        {/* <Route path="settings" element={<div>Settings Page Placeholder</div>} /> */}
      </Route>

      {/* Catch-all route for 404 Not Found pages */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
