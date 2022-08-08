import { IconsType } from '@/components/Icon/Icon'
import { ReactNode } from 'react'

export type Props = {
  children: ReactNode
  titleIcon?: IconsType
  title?: string | ReactNode
  breadcrumbs?: { title: string; url?: string }[]
  teaserHeadline?: string
  teaserContent?: string
}
