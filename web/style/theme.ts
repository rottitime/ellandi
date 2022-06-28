interface ThemeInterface {
  colors: {
    blue: string
    white: string
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

const theme: ThemeInterface = {
  colors: {
    blue: '#1D70B8',
    white: '#fff'
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
