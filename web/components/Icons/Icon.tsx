import dynamic from 'next/dynamic'
import React, { FC, SVGProps } from 'react'

type Props = {
  icon: keyof typeof icons
  title?: string
  titleId?: string
} & SVGProps<SVGSVGElement>

const icons = {
  'crown-logo': dynamic(() => import('@/components/Icons/CrownLogo'))
}

const Icon: FC<Props> = ({ icon, ...props }) => {
  const Component = icons[icon]

  return <Component {...props} />
}

export default Icon
