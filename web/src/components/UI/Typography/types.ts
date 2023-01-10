import { Typography } from '@mui/material'
import { ComponentProps, ElementType } from 'react'

export type Props = {
  pending?: boolean
  component?: ElementType
} & ComponentProps<typeof Typography>
