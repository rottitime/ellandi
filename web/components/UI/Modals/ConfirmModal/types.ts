import { Modal } from '@mui/material'
import { ComponentProps, ReactNode, MouseEvent } from 'react'

export type Props = {
  children: ReactNode
  onConfirm: (event: MouseEvent<HTMLButtonElement>) => void
  title: string
  confirmButton: string
} & ComponentProps<typeof Modal>
