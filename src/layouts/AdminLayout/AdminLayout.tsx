// src/layouts/AdminLayout/AdminLayout.tsx
import React from 'react'
import { Outlet, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom' // For navigation
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button' // Logout button
import LogoutIcon from '@mui/icons-material/Logout'

import useAuthStore from '../../features/authentication/store/authStore'
import { logoutUser as apiLogoutUser } from '../../features/authentication/services/authService'
import { AddCircleOutline, Dashboard, Inventory, Settings, ViewList } from '@mui/icons-material'

const DRAWER_WIDTH = 240

const navItems = [
  { text: 'Dashboard', path: '/', icon: <Dashboard /> },
  { text: 'Product List', path: '/products', icon: <ViewList /> }, // Updated path and icon
  { text: 'Add Product', path: '/products/add', icon: <AddCircleOutline /> },
  { text: 'Inventory', path: '/inventory', icon: <Inventory /> }, // Placeholder path
]

const secondaryNavItems = [{ text: 'Settings', path: '/settings', icon: <Settings /> }]
const AdminLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const storeLogout = useAuthStore((state) => state.logout)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  const handleLogout = async () => {
    console.log('yebarmiad')

    try {
      await apiLogoutUser()
    } catch (error) {
      console.error('Error during API logout:', error)
    } finally {
      console.log('yebarmiad /// login')
      storeLogout()
      navigate('/login')
    }
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            E-Commerce Admin Panel
          </Typography>
          {isAuthenticated && (
            <>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                {user?.name || 'Admin User'}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                variant="outlined"
                size="small"
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Admin Menu
          </Typography>
        </Toolbar>
        <Divider />
        <Box sx={{ overflow: 'auto' }}>
          <List component="nav">
            {navItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    mr: 1.5,
                    color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <List component="nav">
            {secondaryNavItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    mr: 1.5,
                    color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: (theme) => `${theme.mixins.toolbar.minHeight || 64}px`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
