// src/pages/DashboardPage.tsx
import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const DashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Dashboard
      </Typography>
      <Typography paragraph>
        Welcome to your admin dashboard. Key metrics and summaries will be displayed here.
      </Typography>
      {/* TODO: Add charts, stats, etc. */}
    </Box>
  )
}

export default DashboardPage
