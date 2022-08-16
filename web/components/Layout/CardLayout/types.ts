import { ReactNode } from 'react'

export type Props = {
  children: ReactNode
  footer?: ReactNode
  title?: string | ReactNode
  progress?: number
  showPromo?: boolean
}