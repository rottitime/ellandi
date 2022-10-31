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
      d="M39.583 7.066H10.417a4.179 4.179 0 0 0-4.167 4.167V40.4a4.179 4.179 0 0 0 4.167 4.166h29.166A4.179 4.179 0 0 0 43.75 40.4V11.233a4.179 4.179 0 0 0-4.167-4.167ZM16.667 36.233a2.09 2.09 0 0 1-2.084-2.083V23.733a2.09 2.09 0 0 1 2.084-2.083 2.09 2.09 0 0 1 2.083 2.083V34.15a2.09 2.09 0 0 1-2.083 2.083Zm8.333 0a2.09 2.09 0 0 1-2.083-2.083V17.483A2.09 2.09 0 0 1 25 15.4a2.09 2.09 0 0 1 2.083 2.083V34.15A2.09 2.09 0 0 1 25 36.233Zm8.333 0a2.09 2.09 0 0 1-2.083-2.083v-4.167a2.09 2.09 0 0 1 2.083-2.083 2.09 2.09 0 0 1 2.084 2.083v4.167a2.09 2.09 0 0 1-2.084 2.083Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgComponent
