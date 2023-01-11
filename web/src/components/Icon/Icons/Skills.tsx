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
    viewBox="0 0 50 51"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M43.75 17.167c-3.02 0-4.708 3-4.02 5.229l-7.396 7.417c-.625-.188-1.542-.188-2.167 0L24.855 24.5c.708-2.23-.98-5.25-4.021-5.25-3.02 0-4.73 3-4.02 5.25l-9.5 9.48c-2.23-.688-5.23 1-5.23 4.02a4.179 4.179 0 0 0 4.167 4.167c3.02 0 4.708-3 4.02-5.23l9.48-9.5c.625.188 1.541.188 2.166 0l5.313 5.313c-.709 2.23.979 5.25 4.02 5.25 3.022 0 4.73-3 4.022-5.25l7.416-7.396c2.23.688 5.23-1 5.23-4.02a4.179 4.179 0 0 0-4.167-4.167Z"
      fill="currentColor"
    />
    <path
      d="m31.25 19.25 1.958-4.313L37.5 13l-4.292-1.938L31.25 6.75l-1.917 4.313L25 13l4.333 1.938 1.917 4.312ZM7.292 23.417l1.042-4.167 4.167-1.042-4.167-1.041L7.292 13l-1.041 4.167-4.167 1.041 4.167 1.042 1.041 4.167Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgComponent
