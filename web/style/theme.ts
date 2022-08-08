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
    link: colors.blue1,
    success: colors.green
  },
  breakpoints: {
    values: breakpoints
  },
  palette: {
    primary: createColor(colors.blue1),
    blueDark: createColor('#091f3e'),
    greyDark: createColor('#ccc'),
    greyLight: createColor('#f2f2f2'),
    green: createColor('#44D600'),
    //profiles

    //ui
    link: createColor(colors.blue1),

    background: { default: colors.grey1 }
  },
  typography: {
    fontFamily: fonts.default.join(','),
    display: {
      fontWeight: 700,
      fontSize: '60px',
      lineHeight: '110%',
      letterSpacing: '-3px'
    },
    h1: {
      fontWeight: 700,
      fontSize: '30px',
      lineHeight: '123.5%',
      letterSpacing: '-1px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    subtitle1: {
      fontSize: '22px',
      lineHeight: '133.4%;',
      letterSpacing: 0,
      '&.MuiTypography-gutterBottom': {
        marginBottom: 10
      }
    },
    body1: {
      fontSize: '16px',
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
    subtitle2: undefined,
    body2: undefined,
    overline: undefined
  },
  spacing: [0, 5, 10, 16, 30, 60, 110],
  shadows: Array(25).fill('none') as Shadows,
  components: {
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
          display: 'h1',
          h1: 'h1',
          // h2: 'h2',
          // h3: 'h3',
          // h4: 'h4',
          // h5: 'h5',
          // h6: 'h6',
          // subtitle1: 'h3',
          subtitle1: 'p',
          body1: 'p'
        }
      }
    }
  }
})

export default theme
