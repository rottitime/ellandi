import { ColorBrands } from '@/style/types'
import { MouseEvent } from 'react'

export type BrandColor = keyof ColorBrands

export type MenuItem = {
  title: string
  url: string
  color?: BrandColor
  hidden?: boolean
  onClick?: (e: MouseEvent<HTMLLIElement>) => void
}

export type Props = {
  pages: MenuItem[]
  settings: MenuItem[]
}
