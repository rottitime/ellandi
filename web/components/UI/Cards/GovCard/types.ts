import { ReactNode } from 'react'

export type Props = {
  children: ReactNode
  loading?: boolean
  progress?: number
  title: string | ReactNode
}
