import { Brands } from '@/style/theme'
import { MouseEvent } from 'react'

export type BrandColor = keyof Brands

export type MenuItem = {
  title: string
  url: string
  color?: BrandColor
  onClick?: (e: MouseEvent<HTMLLIElement>) => void
}

export type Props = {
  pages: MenuItem[]
  settings: MenuItem[]
}
