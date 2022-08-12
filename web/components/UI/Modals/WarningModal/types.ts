import Modal from '@/components/UI/Modals/Modal/Modal'
import { ComponentProps, MouseEvent } from 'react'

export type Props = {
  onConfirm: (event: MouseEvent<HTMLButtonElement>) => void
  confirmButton: string
} & ComponentProps<typeof Modal>
