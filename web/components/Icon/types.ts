import { SVGProps } from 'react'
import { icons } from './Icon'

export type IconsType = keyof typeof icons

export type Props = {
  icon: IconsType
  title?: string
  titleId?: string
} & SVGProps<SVGSVGElement>
