// src/layouts/AdminLayout/AdminLayout.tsx
import React from 'react'
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom' // Import Link and useLocation
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List' // For navigation list
import ListItemButton from '@mui/material/ListItemButton' // Interactive list item
import ListItemIcon from '@mui/material/ListItemIcon' // For icons in list
import ListItemText from '@mui/material/ListItemText' // For text in list
import Divider from '@mui/material/Divider' // To separate sections in drawer

// Import some icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon from '@mui/icons-material/Inventory'
import SettingsIcon from '@mui/icons-material/Settings'
// import PeopleIcon from '@mui/icons-material/People'; // Example for Users
// import BarChartIcon from '@mui/icons-material/BarChart'; // Example for Reports

const DRAWER_WIDTH = 240

// Define our navigation items
const navItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Products', path: '/products', icon: <ShoppingCartIcon /> }, // Placeholder path for now
  { text: 'Inventory', path: '/inventory', icon: <InventoryIcon /> }, // Placeholder path
  // { text: 'Orders', path: '/orders', icon: <BarChartIcon /> },
  // { text: 'Customers', path: '/customers', icon: <PeopleIcon /> },
]

const secondaryNavItems = [{ text: 'Settings', path: '/settings', icon: <SettingsIcon /> }]

const AdminLayout: React.FC = () => {
  const location = useLocation() // Get current location object

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
          <Typography variant="h6" noWrap component="div">
            E-Commerce Logistics Panel
          </Typography>
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
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Center the content
            // You could add a logo here instead of text
            // Or make its background slightly different if needed
            // borderBottom: (theme) => `1px solid ${theme.palette.divider}`, // if Divider component below is removed
          }}
        >
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Admin Panel
          </Typography>
        </Toolbar>
        <Divider /> {/* A divider below the Toolbar space */}
        <Box sx={{ overflow: 'auto' }}>
          <List component="nav">
            {' '}
            {/* 'component="nav"' adds semantic meaning */}
            {navItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={RouterLink} // Use RouterLink for navigation
                to={item.path}
                selected={location.pathname === item.path} // Highlight if current path matches
                sx={{
                  '&.Mui-selected': {
                    // Styles for selected item
                    backgroundColor: 'action.selected', // Theme-aware selected color
                    '&:hover': {
                      backgroundColor: 'action.hover', // Theme-aware hover on selected
                    },
                  },
                  // You can add more custom styles for ListItemButton here
                }}
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
          <Divider sx={{ my: 1 }} /> {/* Divider between main and secondary nav items */}
          <List component="nav">
            {secondaryNavItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  },
                }}
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
