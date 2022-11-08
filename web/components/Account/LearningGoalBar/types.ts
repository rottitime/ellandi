import { Box } from '@mui/material'
import { ComponentProps } from 'react'

export type Props = {
  hideTitle?: boolean
  description?: string
  // disableFetch?: boolean
} & DisabledFetchType &
  ComponentProps<typeof Box>

type DisabledFetchType =
  | {
      disableFetch?: never
      days?: never
      percentage?: never
    }
  | {
      disableFetch: true
      days: number
      percentage: number
    }
