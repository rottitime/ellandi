import { TabsProps } from '@mui/material'
import { ReactNode } from 'react'

export type TabItem = {
  title: string
  active?: boolean
  content: ReactNode
  disabled?: boolean
  href?: string
}

export type Props = {
  tabItems: TabItem[]
  tabPanel?: ReactNode
  activeIndex?: number
  activeOnUrl?: boolean
} & TabsProps
