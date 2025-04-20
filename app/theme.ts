// app/theme.ts (or /lib/theme.ts)
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#03306b', // matches your global link color
    },
    secondary: {
      main: '#c61111', // hover color
    },
    background: {
      default: '#f5f5f5', // background gradient start
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
    h1: { fontFamily: '"Poppins"', fontWeight: 600, color: '#0d1b2a' },
    h2: { fontFamily: '"Poppins"', fontWeight: 600, color: '#0d1b2a' },
    h3: { fontFamily: '"Poppins"', fontWeight: 600, color: '#0d1b2a' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
})

export default theme
