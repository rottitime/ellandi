import { ComponentProps, MouseEvent } from 'react'
import { Chip as MuiChip } from '@mui/material'
import { ColorBrands } from '@/style/types'

export type Props = {
  toggle?: boolean
  active?: boolean
  avatarText?: string
  brandColor?: keyof ColorBrands
  onToggle?: (e: MouseEvent<HTMLDivElement>, active: boolean) => void
} & ComponentProps<typeof MuiChip>
