import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Props } from './types'

export const icons = {
  'account-circle': dynamic(() => import('@/components/Icon/Icons/AccountCircle')),
  case: dynamic(() => import('@/components/Icon/Icons/Case')),
  'circle-plus': dynamic(() => import('@/components/Icon/Icons/CirclePlus')),
  'circle-delete': dynamic(() => import('@/components/Icon/Icons/CircleDelete')),
  'circle-info': dynamic(() => import('@/components/Icon/Icons/InfoCircle')),
  'crown-logo': dynamic(() => import('@/components/Icon/Icons/CrownLogo')),
  crest: dynamic(() => import('@/components/Icon/Icons/Crest')),
  skills: dynamic(() => import('@/components/Icon/Icons/Skills')),
  learning: dynamic(() => import('@/components/Icon/Icons/Learning')),
  mail: dynamic(() => import('@/components/Icon/Icons/Mail')),
  pencil: dynamic(() => import('@/components/Icon/Icons/Pencil')),
  profile: dynamic(() => import('@/components/Icon/Icons/Profile')),
  question: dynamic(() => import('@/components/Icon/Icons/Question')),
  team: dynamic(() => import('@/components/Icon/Icons/Team')),
  world: dynamic(() => import('@/components/Icon/Icons/World')),
  tick: dynamic(() => import('@/components/Icon/Icons/Tick'))
}

const Icon: FC<Props> = ({ icon, size, ...props }) => {
  const Component = icons[icon]

  return <Component {...props} style={{ fontSize: !!size ? `${size}px` : null }} />
}

export default Icon
export * from './types'
