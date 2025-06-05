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
// We will create ProductListPage later
// import ProductListPage from '@/pages/products/ProductListPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes Wrapper */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />

        <Route path="products/add" element={<AddProductPage />} />
        <Route path="products/edit/:productId" element={<EditProductPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
