import * as React from 'react'
import { SVGProps } from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
}

const SvgComponent = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M480 224H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h448c17.673 0 32-14.327 32-32s-14.327-32-32-32zM32 138.667h448c17.673 0 32-14.327 32-32s-14.327-32-32-32H32c-17.673 0-32 14.327-32 32s14.327 32 32 32zM480 373.333H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h448c17.673 0 32-14.327 32-32s-14.327-32-32-32z" />
  </svg>
)

export default SvgComponent
