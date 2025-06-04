// src/components/molecules/PageHeader/PageHeader.tsx
import React, { type ReactNode } from 'react'
import { styled } from '@mui/material/styles'
import Box, { type BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const StyledHeaderRoot = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(3),
  // backgroundColor: theme.palette.background.paper,
  // borderBottom: `1px solid ${theme.palette.divider}`,
}))

const StyledHeaderContent = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap', // Allow items to wrap on smaller screens
  gap: '16px', // Spacing between title and actions
})

interface PageHeaderProps extends BoxProps {
  title: string
  subtitle?: string
  actions?: ReactNode // To allow passing buttons or other elements
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions, ...rest }) => {
  return (
    <StyledHeaderRoot {...rest}>
      <StyledHeaderContent>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom={!subtitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary" component="p">
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && <Box>{actions}</Box>}
      </StyledHeaderContent>
      <Divider sx={{ mt: 2 }} />
    </StyledHeaderRoot>
  )
}

export default PageHeader
