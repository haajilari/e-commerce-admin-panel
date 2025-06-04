// src/routes/AppRoutes.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AdminLayout from '../layouts/AdminLayout/AdminLayout' // Our main admin layout
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
// Later we will add more page imports here:
// import ProductListPage from '@/pages/ProductListPage';
// import OrderManagementPage from '@/pages/OrderManagementPage';

// Placeholder for authentication check logic
// For now, we'll assume all routes under AdminLayout are "protected" conceptually
// const isAuthenticated = true; // Replace with actual auth check later

const AppRoutes: React.FC = () => {
  console.log('Miad')

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes - these will use the AdminLayout */}
      {/* All routes nested under this will render inside AdminLayout's <Outlet /> */}
      <Route path="/" element={<AdminLayout />}>
        {/* Index route for the admin panel (e.g., /admin or /) */}
        <Route index element={<DashboardPage />} />
        {/* <Route path="dashboard" element={<DashboardPage />} /> // Alternative if you prefer /dashboard explicitly */}

        {/* TODO: Add other protected routes here */}
        {/* <Route path="products" element={<ProductListPage />} /> */}
        {/* <Route path="orders" element={<OrderManagementPage />} /> */}
        {/* <Route path="inventory" element={<div>Inventory Page Placeholder</div>} /> */}
        {/* <Route path="settings" element={<div>Settings Page Placeholder</div>} /> */}
      </Route>

      {/* Catch-all route for 404 Not Found pages */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
