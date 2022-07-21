import { MouseEvent } from 'react'

export type MenuItem = {
  title: string
  url: string
  onClick?: (e: MouseEvent<HTMLLIElement>) => void
}

export type Props = {
  pages: MenuItem[]
  settings: MenuItem[]
}
