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
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M10.083 6.417h1.834V8.25h-1.834V6.417Zm0 3.666h1.834v5.5h-1.834v-5.5ZM11 1.833C5.94 1.833 1.833 5.94 1.833 11S5.94 20.167 11 20.167 20.167 16.06 20.167 11 16.06 1.833 11 1.833Zm0 16.5c-4.043 0-7.333-3.29-7.333-7.333 0-4.042 3.29-7.333 7.333-7.333s7.333 3.29 7.333 7.333-3.29 7.333-7.333 7.333Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgComponent
