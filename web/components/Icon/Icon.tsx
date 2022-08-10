import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Props } from './types'

export const icons = {
  'crown-logo': dynamic(() => import('@/components/Icon/Icons/CrownLogo')),
  'account-circle': dynamic(() => import('@/components/Icon/Icons/AccountCircle')),
  crest: dynamic(() => import('@/components/Icon/Icons/Crest')),
  skills: dynamic(() => import('@/components/Icon/Icons/Skills')),
  learning: dynamic(() => import('@/components/Icon/Icons/Learning')),
  profile: dynamic(() => import('@/components/Icon/Icons/Profile')),
  case: dynamic(() => import('@/components/Icon/Icons/Case')),
  mail: dynamic(() => import('@/components/Icon/Icons/Mail')),
  'circle-plus': dynamic(() => import('@/components/Icon/Icons/CirclePlus'))
}

const Icon: FC<Props> = ({ icon, ...props }) => {
  const Component = icons[icon]

  return <Component {...props} />
}

export default Icon
export * from './types'