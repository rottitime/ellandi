import { ReactNode } from 'react'
import { StandardRegisterProps } from '../types'

export type Props = {
  children: ReactNode
  submitDisabled?: boolean
} & StandardRegisterProps<null>
