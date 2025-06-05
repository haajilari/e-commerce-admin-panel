// src/routes/AppRoutes.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from './ProtectedRoute'

// ... (other page imports if any)

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
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
        {/* Child routes of AdminLayout are now automatically protected */}
        <Route index element={<DashboardPage />} />
        {/* <Route path="products" element={<ProductListPage />} /> */}
        {/* <Route path="orders" element={<OrderManagementPage />} /> */}
        {/* <Route path="settings" element={<SettingsPage />} /> */}
      </Route>

      {/* Catch-all route for 404 Not Found pages */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
