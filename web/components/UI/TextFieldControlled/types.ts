import { TextField } from '@mui/material'
import { ComponentProps } from 'react'

export type Props = {
  label: string
  name: string
  subfield?: boolean
} & ComponentProps<typeof TextField>
