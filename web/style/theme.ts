/* eslint-disable @typescript-eslint/no-empty-interface */
import { createTheme, PaletteColorOptions } from '@mui/material/styles'
import { CSSProperties } from 'react'

export type Colors = {
  blueDark: CSSProperties['color']
  greyDark: CSSProperties['color']
  greyLight: CSSProperties['color']
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
    small: true
    h4: false
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
    blueDark: '#091f3e',
    greyDark: '#ccc',
    greyLight: '#f2f2f2',
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
