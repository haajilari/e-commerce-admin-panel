// src/layouts/AdminLayout/AdminLayout.tsx
import React, { useState } from 'react' // Import useState
import { Outlet, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton, // For toggle buttons
  Tooltip, // For mini sidebar icons
  useTheme, // To access theme properties
  useMediaQuery, // For responsive behavior
} from '@mui/material'

// Import icons
import MenuIcon from '@mui/icons-material/Menu' // For mobile drawer toggle
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon from '@mui/icons-material/Inventory'
import SettingsIcon from '@mui/icons-material/Settings'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ViewListIcon from '@mui/icons-material/ViewList'
import LogoutIcon from '@mui/icons-material/Logout' // For Logout Button

import useAuthStore from '@/features/authentication/store/authStore'
import { logoutUser as apiLogoutUser } from '@/features/authentication/services/authService'

const FULL_DRAWER_WIDTH = 240
const MINI_DRAWER_WIDTH = 70 // Width when sidebar is minimized

const navItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Product List', path: '/products', icon: <ViewListIcon /> },
  { text: 'Add Product', path: '/products/add', icon: <AddCircleOutlineIcon /> },
  { text: 'Inventory', path: '/inventory', icon: <InventoryIcon /> }, // Placeholder
]

const secondaryNavItems = [
  { text: 'Settings', path: '/settings', icon: <SettingsIcon /> }, // Placeholder
]

const AdminLayout: React.FC = () => {
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const storeLogout = useAuthStore((state) => state.logout)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  // State for sidebar/drawer
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) // Breakpoint for mobile view
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [isDesktopSidebarMinimized, setIsDesktopSidebarMinimized] = useState(false)

  const handleLogout = async () => {
    try {
      await apiLogoutUser()
    } catch (error) {
      console.error('Error during API logout:', error)
    } finally {
      storeLogout()
      navigate('/login')
    }
  }

  const handleDesktopSidebarToggle = () => {
    setIsDesktopSidebarMinimized(!isDesktopSidebarMinimized)
  }

  const handleMobileDrawerToggle = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen)
  }

  const currentDrawerWidth = isMobile
    ? FULL_DRAWER_WIDTH // Mobile drawer is always full width when open
    : isDesktopSidebarMinimized
      ? MINI_DRAWER_WIDTH
      : FULL_DRAWER_WIDTH

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile
            ? 'space-between'
            : isDesktopSidebarMinimized
              ? 'center'
              : 'space-between',
          px: isDesktopSidebarMinimized && !isMobile ? 1 : 2, // Adjust padding for mini sidebar
        }}
      >
        {!isDesktopSidebarMinimized && !isMobile && (
          <Typography
            variant="h6"
            sx={{ color: 'primary.main', fontWeight: 'bold', whiteSpace: 'nowrap' }}
          >
            Admin Menu
          </Typography>
        )}
        {/* Desktop sidebar toggle button (visible only on desktop) */}
        {!isMobile && (
          <IconButton onClick={handleDesktopSidebarToggle} size="small">
            {isDesktopSidebarMinimized ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
        {/* On mobile, a close button might be inside the drawer if the hamburger is only in AppBar */}
      </Toolbar>
      <Divider />
      <List component="nav">
        {navItems.map((item) => (
          <Tooltip
            title={isDesktopSidebarMinimized && !isMobile ? item.text : ''}
            placement="right"
            key={item.text + '-tooltip'}
          >
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: isDesktopSidebarMinimized && !isMobile ? 'center' : 'flex-start',
                px: isDesktopSidebarMinimized && !isMobile ? 2.5 : 3,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  '&:hover': { backgroundColor: 'action.hover' },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDesktopSidebarMinimized && !isMobile ? 'auto' : 1.5,
                  justifyContent: 'center',
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: isMobile ? 1 : isDesktopSidebarMinimized ? 0 : 1,
                  whiteSpace: 'nowrap',
                  transition: theme.transitions.create('opacity', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.shortest,
                  }),
                }}
              />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List component="nav">
        {secondaryNavItems.map((item) => (
          <Tooltip
            title={isDesktopSidebarMinimized && !isMobile ? item.text : ''}
            placement="right"
            key={item.text + '-tooltip-secondary'}
          >
            <ListItemButton
              key={item.text}
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: isDesktopSidebarMinimized && !isMobile ? 'center' : 'flex-start',
                px: isDesktopSidebarMinimized && !isMobile ? 2.5 : 3,
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  '&:hover': { backgroundColor: 'action.hover' },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDesktopSidebarMinimized && !isMobile ? 'auto' : 1.5,
                  justifyContent: 'center',
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: isMobile ? 1 : isDesktopSidebarMinimized ? 0 : 1,
                  whiteSpace: 'nowrap',
                  transition: theme.transitions.create('opacity', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.shortest,
                  }),
                }}
              />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? '100%' : `calc(100% - ${currentDrawerWidth}px)`,
          ml: isMobile ? 0 : `${currentDrawerWidth}px`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: isDesktopSidebarMinimized
              ? theme.transitions.duration.leavingScreen
              : theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar>
          {/* Mobile menu toggle button (visible only on mobile) */}
          {isMobile && ( // Visible only on mobile
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMobileDrawerToggle} // Toggles isMobileDrawerOpen state
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            E-Commerce Logistics Panel
          </Typography>
          {isAuthenticated && (
            <>
              <Typography variant="body2" sx={{ mr: 1.5, display: { xs: 'none', sm: 'block' } }}>
                {user?.name || 'Admin User'}
              </Typography>
              <Tooltip title="Logout">
                <IconButton color="inherit" onClick={handleLogout} size="medium">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? isMobileDrawerOpen : true}
        onClose={isMobile ? handleMobileDrawerToggle : undefined} // onClose only for temporary
        ModalProps={{ keepMounted: true }} // Better open performance on mobile for temporary drawer
        sx={{
          width: currentDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: currentDrawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            overflowX: 'hidden', // Important for mini variant to hide text before opacity kicks in
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration:
                isDesktopSidebarMinimized && !isMobile
                  ? theme.transitions.duration.leavingScreen
                  : theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: (theme) => `${theme.mixins.toolbar.minHeight || 64}px`,
          ml: isMobile ? 0 : `${currentDrawerWidth}px`, // Dynamic margin for desktop
          width: isMobile ? '100%' : `calc(100% - ${currentDrawerWidth}px)`, // Dynamic width for desktop
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration:
              isDesktopSidebarMinimized && !isMobile
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
