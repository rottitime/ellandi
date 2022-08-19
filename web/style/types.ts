import { CSSProperties } from 'react'
/* eslint-disable @typescript-eslint/no-empty-interface */
import { PaletteColorOptions } from '@mui/material/styles'

type ColorUI = {
  link: CSSProperties['color']
  success: CSSProperties['color']
}

export type ColorBrands = {
  brandGov: CSSProperties['color']
  brandSkills: CSSProperties['color']
  brandLearning: CSSProperties['color']
  brandTeams: CSSProperties['color']
}

export type Colors = {
  black: CSSProperties['color']
  teal: CSSProperties['color']
  orange: CSSProperties['color']
  purple: CSSProperties['color']
  grey1: CSSProperties['color']
  grey2: CSSProperties['color']
  grey3: CSSProperties['color']
  grey4: CSSProperties['color']
  blue1: CSSProperties['color']
  blue2: CSSProperties['color']
  green: CSSProperties['color']
  red: CSSProperties['color']
  white: CSSProperties['color']
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true
    small: true
    h2: false
    h3: false
    h4: false
    h5: false
    h6: false
    // subtitle1: false
    subtitle2: false
    body2: false
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
    display?: CSSProperties
  }

  interface Theme {
    colors: Colors & ColorBrands & ColorUI
  }

  interface ThemeOptions {
    colors: Colors & ColorBrands & ColorUI
  }

  interface CustomPalette {
    blueDark: PaletteColorOptions
    greyDark: PaletteColorOptions
    greyLight: PaletteColorOptions
    green: PaletteColorOptions

    link: PaletteColorOptions
  }

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface BreakpointOverrides {
    sm: false
  }
}
