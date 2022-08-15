import { Modal } from '@mui/material'
import { ComponentProps, ReactNode } from 'react'

export type Props = {
  children: ReactNode
  title: string
  footer?: ReactNode
} & ComponentProps<typeof Modal>
