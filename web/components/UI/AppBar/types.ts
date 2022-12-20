import { ColorBrands } from '@/style/types'
import { AppBar } from '@mui/material'
import { ComponentProps, MouseEvent } from 'react'

export type BrandColor = keyof ColorBrands

export type MenuItem = {
  title: string
  url: string
  color?: BrandColor
  hidden?: boolean
  onClick?: (e: MouseEvent<HTMLLIElement>) => void
  active?: boolean
}

export type Props = {
  pages: MenuItem[]
  settings: MenuItem[]
  settingsTip?: string
  homepage: MenuItem
} & ComponentProps<typeof AppBar>
