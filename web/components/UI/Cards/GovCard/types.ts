import { ComponentProps, ReactNode } from 'react'
import { Card } from '@mui/material'

export type Props = {
  children: ReactNode
  progress?: number
  title: string | ReactNode
  headerTitle?: string
  loading: boolean
} & ComponentProps<typeof Card>
