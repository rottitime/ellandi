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
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <circle cx={12.5} cy={12.5} r={12.5} fill="currentColor" />
    <path
      d="M17.8 9.316h-2.4V8.158C15.4 7.515 14.866 7 14.2 7h-2.4c-.666 0-1.2.515-1.2 1.158v1.158H8.2c-.666 0-1.194.515-1.194 1.158L7 16.842C7 17.485 7.534 18 8.2 18h9.6c.666 0 1.2-.515 1.2-1.158v-6.368c0-.643-.534-1.158-1.2-1.158Zm-3.6 0h-2.4V8.158h2.4v1.158Z"
      fill="#fff"
    />
  </svg>
)

export default SvgComponent
