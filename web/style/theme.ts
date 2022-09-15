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
  teal: '#00897B',
  orange: '#FF3D00',
  purple: '#6458F4',

  grey1: '#E9EAEC',
  grey2: '#AEAEAE',
  grey3: '#666',
  grey4: '#F5F6F7',
  blue1: '#1976D2',
  blue2: '#064B9A',

  green: '#00C853',
  red: '#D32F2F',
  white: '#fff'
}

const theme = createTheme({
  colors: {
    ...colors,
    brandGov: colors.black,
    brandSkills: colors.teal,
    brandLearning: colors.orange,
    brandTeams: colors.purple,
    link: colors.blue1,
    success: colors.green
  },
  breakpoints: {
    values: breakpoints
  },
  palette: {
    primary: createColor(colors.blue1),
    secondary: {
      main: colors.grey3,
      dark: colors.grey2
    },
    tertiary: createColor(colors.blue1),
    background: { default: colors.grey1 }
  },
  typography: {
    fontFamily: fonts.default.join(','),
    h1: {
      fontWeight: 700,
      fontSize: '30px',
      lineHeight: '123.5%',
      letterSpacing: '-1px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    body1: {
      fontWeight: 500,
      fontSize: '22px',
      lineHeight: '150%;',
      letterSpacing: '0.15px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 10
      }
    },
    body2: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '150%;',
      letterSpacing: '0.15px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 10
      }
    },
    h2: undefined,
    h3: undefined,
    h4: undefined,
    h5: undefined,
    h6: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    // body2: undefined,
    overline: undefined
    // caption: undefined
  },
  spacing: [0, 5, 10, 16, 30, 60, 110],
  shadows: Array(25).fill('none') as Shadows,
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '.MuiFormControlLabel-label': {
            fontSize: '16px'
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
