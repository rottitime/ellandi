import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
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
}
