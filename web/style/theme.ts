import { createTheme } from '@mui/material/styles'

const breakpoints = {
  xs: 0,
  md: 767,
  lg: 1023,
  xl: 1399
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true
    h4: false
    h5: false
    h6: false
    subtitle2: false
    // body2: false
    overline: false
  }
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
      default: 'rgb(242, 242, 242)'
    }
  },
  typography: {
    h1: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 400,
      '&.MuiTypography-gutterBottom': {
        marginBottom: 50
      }
    },
    h2: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 400
    },
    h3: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 400
    },
    subtitle1: {
      fontSize: '17px'
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    caption: {
      fontSize: '14px',
      lineHeight: '24px'
    },
    h4: undefined,
    h5: undefined,
    h6: undefined,
    subtitle2: undefined,
    // body2: undefined,
    overline: undefined
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          //background: 'url(/images/test/bg1.webp) bottom center  no-repeat',
          //backgroundSize: 'cover',
          minHeight: '100vh'
        }
      }
    }
  }
})

export default theme
