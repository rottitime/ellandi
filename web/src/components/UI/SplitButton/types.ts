import { MouseEvent, MouseEventHandler } from 'react'

export type Props = {
  label: string
  options: string[]
  highlightSelected?: boolean
  onSelected: (event: MouseEvent<HTMLLIElement>, option: string) => void
  onClick?: MouseEventHandler<HTMLButtonElement>
}
