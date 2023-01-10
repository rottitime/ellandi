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
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    viewBox="0 0 25 24"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath="url(#a)">
      <path
        d="M20.5 4h-16c-1.1 0-1.99.9-1.99 2L2.5 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm-.4 4.25-7.07 4.42c-.32.2-.74.2-1.06 0L4.9 8.25a.85.85 0 1 1 .9-1.44L12.5 11l6.7-4.19a.85.85 0 1 1 .9 1.44Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(.5)" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgComponent
