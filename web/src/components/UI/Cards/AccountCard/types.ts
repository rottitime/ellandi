import { ComponentProps, ReactNode } from 'react'
import { Card } from '@mui/material'
import { IconsType } from '@/components/Icon/Icon'
import { ColorBrands } from '@/style/types'

export type Props = {
  children?: ReactNode
  color?: keyof ColorBrands
  headerLogoSize?: 'medium' | 'large'
  headerLogo?: IconsType
  header?: ReactNode
  headerColorInherit?: boolean
  loading?: boolean
  action?: ReactNode
} & ComponentProps<typeof Card>
