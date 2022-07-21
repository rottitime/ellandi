/* eslint-disable @typescript-eslint/no-empty-interface */
import { createTheme, PaletteColorOptions } from '@mui/material/styles'
import { CSSProperties } from 'react'

export type Colors = {
  blueDark: CSSProperties['color']
  greyDark: CSSProperties['color']
  greyLight: CSSProperties['color']
  green: CSSProperties['color']
  white: CSSProperties['color']
  //profiles
  profileBlue: CSSProperties['color']
  profilePink: CSSProperties['color']
  profileGreen: CSSProperties['color']
  profileYellow: CSSProperties['color']
  //ui
  link: CSSProperties['color']
}

const breakpoints = {
  xs: 0,
  md: 767,
  lg: 1023,
  xl: 1399
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    leader: true
    small: true
    h5: false
    h6: false
    subtitle2: false
    // body2: false
    overline: false
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    blueDark: true
    // apple: true;
    // steelBlue: true;
    // violet: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    leader?: CSSProperties
  }

  interface Theme {
    colors: Colors
  }

  interface ThemeOptions {
    colors: Colors
  }

  interface CustomPalette {
    blueDark: PaletteColorOptions
    greyDark: PaletteColorOptions
    greyLight: PaletteColorOptions
    green: PaletteColorOptions
    //profiles
    profileBlue: PaletteColorOptions
    profilePink: PaletteColorOptions
    profileGreen: PaletteColorOptions
    profileYellow: PaletteColorOptions
    //ui
    link: PaletteColorOptions
  }

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface BreakpointOverrides {
    sm: false
  }
}

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } })

const theme = createTheme({
  colors: {
    blueDark: '#161E2F',
    greyDark: '#ccc',
    greyLight: '#f2f2f2',
    green: '#44D600',
    white: '#fff',
    //profiles
    profileBlue: '#144E81',
    profilePink: '#80224D',
    profileGreen: '#10403C',
    profileYellow: '#594D00',
    //ui
    link: '#1976d2'
  },
  breakpoints: {
    values: breakpoints
  },
  palette: {
    blueDark: createColor('#091f3e'),
    greyDark: createColor('#ccc'),
    greyLight: createColor('#f2f2f2'),
    green: createColor('#44D600'),
    //profiles
    profileBlue: createColor('#144E81'),
    profilePink: createColor('#80224D'),
    profileGreen: createColor('#10403C'),
    profileYellow: createColor('#594D00'),
    //ui
    link: createColor('#1976d2'),

    background: {
      default: '#F6F8FB'
    }
  },
  typography: {
    leader: {
      fontWeight: 700,
      fontSize: '35px',
      lineHeight: '130%'
    },
    h1: {
      fontWeight: 700,
      fontSize: '30px',
      lineHeight: '35px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: '15px'
      }
    },
    h2: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 600
    },
    h3: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 600
    },
    h4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 600
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '130%',
      color: '#8F99A8',
      '&.MuiTypography-gutterBottom': {
        marginBottom: '15px'
      }
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
    h5: undefined,
    h6: undefined,
    subtitle2: undefined,
    // body2: undefined,
    overline: undefined
  },
  spacing: [0, 4, 8, 16, 30, 60, 110],
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          leader: 'h1',
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          subtitle1: 'h3',
          body1: 'p',
          body2: 'p'
        }
      }
    },
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
