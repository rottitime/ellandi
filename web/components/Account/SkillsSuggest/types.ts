import { Box } from '@mui/material'
import { ComponentProps } from 'react'

export type Props = {
  hideOptions: string[]
  onSelected: (value: string) => void
} & ComponentProps<typeof Box>
