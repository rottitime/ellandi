import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

const breakpoints = {
  xs: 0,
  md: 767,
  lg: 1023,
  xl: 1399
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    sm: false
  }
}

const theme = createTheme({
  breakpoints: {
    values: breakpoints
  },
  palette: {
    background: {
      default: '#F2F2F2'
    },
    primary: {
      main: grey[500]
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'url(/images/test/bg1.webp) bottom center  no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh'
        }
      }
    }
  }
})

export default theme
