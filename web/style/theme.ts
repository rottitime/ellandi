/* eslint-disable @typescript-eslint/no-empty-interface */
import { alpha, createTheme, PaletteColorOptions, Shadows } from '@mui/material/styles'
import { CSSProperties } from 'react'

export type Brands = {
  brandGov: CSSProperties['color']
  brandSkills: CSSProperties['color']
  brandLearning: CSSProperties['color']
}

export type Colors = {
  black: CSSProperties['color']
  blueDark: CSSProperties['color']
  greyDark: CSSProperties['color']
  greyLight: CSSProperties['color']
  green: CSSProperties['color']
  white: CSSProperties['color']

  //ui
  link: CSSProperties['color']
  success: CSSProperties['color']
} & Brands

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
    black: '#000',
    blueDark: '#161E2F',
    greyDark: '#9F9F9F',
    greyLight: '#f2f2f2',
    green: '#00E676',
    white: '#fff',

    brandGov: '#000',
    brandSkills: '#00897B',
    brandLearning: '#FF3D00',

    link: '#1976D2',
    success: '#00E676'
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

    //ui
    link: createColor('#1976d2'),

    background: {
      default: '#E9EAEC'
    }
  },
  typography: {
    leader: {
      fontWeight: 700,
      fontSize: '34px',
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
      fontWeight: 300,
      fontSize: '24px',
      lineHeight: '130%',
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
  shadows: Array(25).fill('none') as Shadows,
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#1976D2',
          textDecorationColor: 'inherit',
          fontWeight: 500,
          transition: 'opacity 0.3s ease-in-out',
          '&:hover': {
            opacity: 0.7
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
          minHeight: '100vh'
        }
      }
    }
  }
})

export default theme
