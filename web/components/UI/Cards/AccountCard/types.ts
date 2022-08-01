import { Brands } from '@/style/theme'
import { ComponentProps, ReactNode } from 'react'
import { Card } from '@mui/material'
import { IconsType } from '@/components/Icons/Icon'

export type Props = {
  children: ReactNode
  color?: keyof Brands
  headerLogoSize?: 'medium' | 'large'
  headerLogo?: IconsType
  header?: ReactNode
  headerColorInherit?: boolean
} & ComponentProps<typeof Card>
