import { ColorBrands } from '@/style/types'
import { TabsProps } from '@mui/material'
import { ReactNode } from 'react'

export type TabItem = {
  title: string
  active?: boolean
  content: ReactNode
  disabled?: boolean
  href?: string
} & BrandColor

type BrandColor = { brandColor?: keyof ColorBrands }

export type Props = {
  tabItems: TabItem[]
  tabPanel?: ReactNode
  activeIndex?: number
  activeOnUrl?: boolean
  disableCard?: boolean
} & TabsProps &
  BrandColor

export type StyleProps = BrandColor

export type RoutedTabsProps = {
  routedTabItems: RoutedTabItem[]
  tabsPath: string
} & BrandColor

export type RoutedTabItem = Omit<TabItem, 'href'> & {
  id: string
}
