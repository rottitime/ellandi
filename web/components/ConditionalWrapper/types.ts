import { ReactElement, ReactNode } from 'react'

export type Props = {
  condition: boolean
  wrapper: (children: ReactNode) => ReactElement
  children: ReactElement
}
