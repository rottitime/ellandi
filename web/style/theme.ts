import { createTheme, Shadows } from '@mui/material/styles'
import { Colors } from './types'

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } })

const breakpoints = {
  xs: 0,
  md: 767,
  lg: 1023,
  xl: 1399
}

const fonts = {
  default: ['Poppins', 'sans-serif']
}

const colors: Colors = {
  black: '#000',

  grey1: '#E9EAEC',
  grey2: '#AEAEAE',
  grey3: '#666',
  grey4: '#F5F6F6',
  blue1: '#1669BB',
  blue2: '#064B9A',
  blue3: '#0045AD',

  green1: '#008537',
  green2: '#80C4BD',
  green3: '#006157',
  red: '#D32F2F',
  white: '#fff'
}

const theme = createTheme({
  colors: {
    ...colors,
    brandGov: colors.black,
    brandSkills: colors.green3,
    brandLearning: colors.blue3,
    link: colors.blue1,
    success: colors.green1
  },
  breakpoints: {
    values: breakpoints
  },
  palette: {
    primary: {
      main: colors.black,
      dark: colors.grey3
    },
    secondary: {
      main: colors.grey3,
      dark: colors.grey2
    },
    tertiary: createColor(colors.black),
    background: { default: colors.grey1 }
  },
  typography: {
    fontFamily: fonts.default.join(','),
    h1: {
      fontWeight: 700,
      fontSize: 30,
      lineHeight: '123.5%',
      letterSpacing: '-1px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    h2: {
      fontWeight: 700,
      fontSize: 22,
      lineHeight: '123.5%',
      letterSpacing: '-1px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    h3: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '123.5%',
      letterSpacing: '-1px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    body1: {
      fontWeight: 500,
      fontSize: 22,
      lineHeight: '150%;',
      letterSpacing: '0.15px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 10
      }
    },
    body2: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '150%;',
      letterSpacing: '0.15px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 10
      }
    },
    h4: undefined,
    h5: undefined,
    h6: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    overline: undefined
  },
  spacing: [0, 5, 10, 16, 30, 60, 110],
  shadows: Array(25).fill('none') as Shadows,
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 16
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 16
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 16
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '.MuiFormControlLabel-label': {
            fontSize: 16
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.blue1,
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
          h1: 'h1',
          body1: 'p',
          body2: 'p'
        }
      }
    }
  }
})

export default theme
