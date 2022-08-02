import { ReactNode } from 'react'

export type Props = {
  children: ReactNode
  progress?: number
  title: string | ReactNode
}
