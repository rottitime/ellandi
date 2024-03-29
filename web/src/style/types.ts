import { CSSProperties } from 'react'
/* eslint-disable @typescript-eslint/no-empty-interface */
import { PaletteColorOptions } from '@mui/material/styles'

export type AllColors = keyof ColorBrands | keyof Colors
export type BrandColors = keyof ColorBrands

type ColorUI = {
  link: CSSProperties['color']
  success: CSSProperties['color']
}

export type ColorBrands = {
  brandGov: CSSProperties['color']
  brandSkills: CSSProperties['color']
  brandLearning: CSSProperties['color']
}

export type Colors = {
  black: CSSProperties['color']
  grey1: CSSProperties['color']
  grey2: CSSProperties['color']
  grey3: CSSProperties['color']
  grey4: CSSProperties['color']
  blue1: CSSProperties['color']
  blue2: CSSProperties['color']
  blue3: CSSProperties['color']
  green1: CSSProperties['color']
  green2: CSSProperties['color']
  green3: CSSProperties['color']
  red: CSSProperties['color']
  white: CSSProperties['color']
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true
    h2: true
    h3: true
    h4: false
    h5: false
    h6: false
    subtitle1: false
    subtitle2: false
    body2: true
    overline: false
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    // display?: CSSProperties
  }

  interface Theme {
    colors: Colors & ColorBrands & ColorUI
  }

  interface ThemeOptions {
    colors: Colors & ColorBrands & ColorUI
  }

  interface CustomPalette {
    tertiary: PaletteColorOptions
  }

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface BreakpointOverrides {
    sm: false
  }
}
