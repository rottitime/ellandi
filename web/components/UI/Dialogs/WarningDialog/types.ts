import Dialog from '@/components/UI/Dialogs/Dialog/Dialog'
import { ComponentProps, MouseEvent } from 'react'

export type Props = {
  onConfirm: (event: MouseEvent<HTMLButtonElement>) => void
  confirmButton: string
  buttonLoading?: boolean
} & ComponentProps<typeof Dialog>
