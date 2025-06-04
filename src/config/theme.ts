// src/config/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const PRIMARY_MAIN_COLOR = '#3f51b5'
const PRIMARY_DARK_COLOR = '#303f9f'
const PRIMARY_LIGHT_COLOR = '#c5cae9'

const SECONDARY_MAIN_COLOR = '#f50057'
const SECONDARY_DARK_COLOR = '#c51162'

const ERROR_MAIN_COLOR = '#f44336'
const WARNING_MAIN_COLOR = '#ff9800'
const INFO_MAIN_COLOR = '#2196f3'
const SUCCESS_MAIN_COLOR = '#4caf50'

const TEXT_PRIMARY_COLOR = 'rgba(0, 0, 0, 0.87)'
const TEXT_SECONDARY_COLOR = 'rgba(0, 0, 0, 0.6)'

const BACKGROUND_DEFAULT_COLOR = '#f4f6f8'
const BACKGROUND_PAPER_COLOR = '#ffffff'

const FONT_FAMILY_SANS_SERIF = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',')

let theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN_COLOR,
      dark: PRIMARY_DARK_COLOR,
      light: PRIMARY_LIGHT_COLOR,
    },
    secondary: {
      main: SECONDARY_MAIN_COLOR,
      dark: SECONDARY_DARK_COLOR,
    },
    error: {
      main: ERROR_MAIN_COLOR,
    },
    warning: {
      main: WARNING_MAIN_COLOR,
    },
    info: {
      main: INFO_MAIN_COLOR,
    },
    success: {
      main: SUCCESS_MAIN_COLOR,
    },
    text: {
      primary: TEXT_PRIMARY_COLOR,
      secondary: TEXT_SECONDARY_COLOR,
    },
    background: {
      default: BACKGROUND_DEFAULT_COLOR,
      paper: BACKGROUND_PAPER_COLOR,
    },
    // mode: 'light', // Can be 'light' or 'dark'
  },
  typography: {
    fontFamily: FONT_FAMILY_SANS_SERIF,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem', // 16px
    },
    button: {
      textTransform: 'none', 
      fontWeight: 500,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      defaultProps: {
        // disableElevation: true, // Example: remove shadow from all contained buttons
        // disableRipple: true, // Example: disable ripple effect
      },
      styleOverrides: {
        root: {
          // Styles applied to the root element of all Buttons
          // padding: '8px 24px', // Example: custom padding for all buttons
        },
        // containedPrimary: { // Styles for contained buttons with primary color
        //   '&:hover': {
        //     backgroundColor: PRIMARY_DARK_COLOR,
        //   }
        // }
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        // size: 'small',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: BACKGROUND_PAPER_COLOR,
          color: TEXT_PRIMARY_COLOR,
        },
      },
    },
  },
})
theme = responsiveFontSizes(theme)

export default theme
