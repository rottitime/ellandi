import { IconsType } from '@/components/Icon/Icon'
import { ColorBrands } from '@/style/types'
import { ReactNode } from 'react'

export type Props = {
  children: ReactNode
  brandColor?: keyof ColorBrands
  titleIcon?: IconsType
  title?: string | ReactNode
  breadcrumbs?: { title: string; url?: string }[]
  teaserHeadline?: string
  teaserContent?: string
}
