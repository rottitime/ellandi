import dynamic from 'next/dynamic'
import React, { FC, SVGProps } from 'react'

export type IconsType = keyof typeof icons

type Props = {
  icon: IconsType
  title?: string
  titleId?: string
} & SVGProps<SVGSVGElement>

const icons = {
  'crown-logo': dynamic(() => import('@/components/Icons/CrownLogo')),
  'account-circle': dynamic(() => import('@/components/Icons/AccountCircle')),
  crest: dynamic(() => import('@/components/Icons/Crest')),
  skills: dynamic(() => import('@/components/Icons/Skills')),
  learning: dynamic(() => import('@/components/Icons/Learning')),
  profile: dynamic(() => import('@/components/Icons/Profile')),
  case: dynamic(() => import('@/components/Icons/Case')),
  mail: dynamic(() => import('@/components/Icons/Mail')),
  'circle-plus': dynamic(() => import('@/components/Icons/CirclePlus'))
}

const Icon: FC<Props> = ({ icon, ...props }) => {
  const Component = icons[icon]

  return <Component {...props} />
}

export default Icon
