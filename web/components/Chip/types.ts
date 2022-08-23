import { ComponentProps, MouseEvent } from 'react'
import { Chip as MuiChip } from '@mui/material'

export type Props = {
  toggle?: boolean
  active?: boolean
  avatarText?: string
  onToggle?: (e: MouseEvent<HTMLDivElement>, active: boolean) => void
} & ComponentProps<typeof MuiChip>
