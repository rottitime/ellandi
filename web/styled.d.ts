import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: string
      blueLight: string
      white: string
      greyLight: string
      greyDark: string
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
}
