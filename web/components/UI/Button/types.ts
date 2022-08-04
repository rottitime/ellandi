import { ComponentProps } from 'react'
import { LoadingButton } from '@mui/lab'

export type Props = {
  loading?: boolean
  href?: string
} & ComponentProps<typeof LoadingButton>
