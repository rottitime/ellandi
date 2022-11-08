import { Box } from '@mui/material'
import { ComponentProps } from 'react'

export type Props = {
  hideTitle?: boolean
  description?: string
} & ComponentProps<typeof Box>
