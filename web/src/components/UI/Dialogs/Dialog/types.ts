import { Dialog } from '@mui/material'
import { ComponentProps, ReactElement, ReactNode } from 'react'
import { TransitionProps as MuiTransitionProps } from '@mui/material/transitions'

export type Props = {
  children: ReactElement
  title: string
  actions?: ReactNode
  onClose?: () => void
} & ComponentProps<typeof Dialog>

export type TransitionProps = MuiTransitionProps & {
  children: ReactElement
}
