import { Tooltip } from '@mui/material'
import { ColorBrands } from '@/style/types'
import { ComponentProps } from 'react'

export type Props = {
  brandColor?: keyof ColorBrands
} & ComponentProps<typeof Tooltip>
