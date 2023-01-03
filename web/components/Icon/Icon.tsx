import dynamic from 'next/dynamic'
import { Props } from './types'

export const icons = {
  'account-circle': dynamic(() => import('@/components/Icon/Icons/AccountCircle')),
  case: dynamic(() => import('@/components/Icon/Icons/Case')),
  'circle-plus': dynamic(() => import('@/components/Icon/Icons/CirclePlus')),
  'circle-delete': dynamic(() => import('@/components/Icon/Icons/CircleDelete')),
  'circle-info': dynamic(() => import('@/components/Icon/Icons/InfoCircle')),
  'circle-info-filled': dynamic(() => import('@/components/Icon/Icons/InfoCircleFilled')),
  'crown-logo': dynamic(() => import('@/components/Icon/Icons/CrownLogo')),
  crest: dynamic(() => import('@/components/Icon/Icons/Crest')),
  hourglass: dynamic(() => import('@/components/Icon/Icons/Hourglass')),
  cross: dynamic(() => import('@/components/Icon/Icons/Cross')),
  skills: dynamic(() => import('@/components/Icon/Icons/Skills')),
  mail: dynamic(() => import('@/components/Icon/Icons/Mail')),
  'mortar-hat': dynamic(() => import('@/components/Icon/Icons/MortarHat')),
  pencil: dynamic(() => import('@/components/Icon/Icons/Pencil')),
  profile: dynamic(() => import('@/components/Icon/Icons/Profile')),
  question: dynamic(() => import('@/components/Icon/Icons/Question')),
  report: dynamic(() => import('@/components/Icon/Icons/Report')),
  team: dynamic(() => import('@/components/Icon/Icons/Team')),
  world: dynamic(() => import('@/components/Icon/Icons/World')),
  tick: dynamic(() => import('@/components/Icon/Icons/Tick')),
  'cabinet-office': dynamic(() => import('@/components/Icon/Icons/CabinetOffice')),
  menu: dynamic(() => import('@/components/Icon/Icons/Menu')),
  exit: dynamic(() => import('@/components/Icon/Icons/Exit'))
}

const Icon = ({ icon, size, ...props }: Props) => {
  const Component = icons[icon]
  return <Component {...props} style={{ fontSize: !!size ? `${size}px` : null }} />
}

export default Icon
export * from './types'
