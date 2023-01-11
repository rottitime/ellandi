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
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M12 2.5c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10Zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.91 9.11 16.8a.996.996 0 1 1-1.41-1.41l2.89-2.89L7.7 9.61A.996.996 0 1 1 9.11 8.2L12 11.09l2.89-2.89a.996.996 0 1 1 1.41 1.41l-2.89 2.89 2.89 2.89c.38.38.38 1.02 0 1.41Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgComponent
