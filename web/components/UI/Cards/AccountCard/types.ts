import { Brands } from '@/style/theme'
import { ComponentProps, ReactNode } from 'react'
import { Card } from '@mui/material'

export type Props = {
  children: ReactNode
  color?: keyof Brands
  headerLogo?: ReactNode
  header?: ReactNode
} & ComponentProps<typeof Card>
