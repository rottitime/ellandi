import { ReactNode } from 'react'
import { StandardRegisterProps } from '../types'

export type Props = {
  children: ReactNode
  error?: string
  submitDisabled?: boolean
} & StandardRegisterProps<null>
