import { Tooltip } from '@mui/material'
import { ColorBrands } from '@/style/types'
import { ComponentProps, ReactNode } from 'react'

export type Props = {
  brandColor?: keyof ColorBrands
  children?: ReactElement
} & Omit<ComponentProps<typeof Tooltip>, 'children'>
