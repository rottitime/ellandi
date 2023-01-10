import { Tooltip } from '@mui/material'
import { ColorBrands } from '@/style/types'
import { ComponentProps, ReactElement } from 'react'
import { IconsType } from '@/components/Icon/types'

export type Props = {
  brandColor?: keyof ColorBrands
  children?: ReactElement
  icon?: IconsType
} & Omit<ComponentProps<typeof Tooltip>, 'children'>
