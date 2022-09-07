import { Dialog } from '@mui/material'
import { ComponentProps, ReactElement, ReactNode } from 'react'

export type Props = {
  children: ReactElement
  title: string
  actions?: ReactNode
} & ComponentProps<typeof Dialog>
