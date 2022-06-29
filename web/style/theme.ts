import { DefaultTheme } from 'styled-components'

interface ThemeInterface {
  colors: {
    blue: string
    white: string
    greyLight: string
  }
  palette: {
    profile: {
      skills: {
        color: string
      }
      learning: {
        color: string
      }
      careers: {
        color: string
      }
      communities: {
        color: string
      }
    }
  }
}

const theme: DefaultTheme = {
  colors: {
    blue: '#1D70B8',
    white: '#fff',
    greyLight: '#B1B4B6'
  },
  palette: {
    profile: {
      skills: {
        color: '#144E81'
      },
      learning: {
        color: '#80224D'
      },
      careers: {
        color: '#10403C'
      },
      communities: {
        color: '#594D00'
      }
    }
  }
}

export default theme
