import { Box } from '@mui/material'
import { ComponentProps } from 'react'

export type Props = {
  sticky?: boolean
  getHeight?: (height: number) => void
} & ComponentProps<typeof Box>
