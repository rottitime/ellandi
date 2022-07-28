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
    viewBox="0 0 50 51"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <rect y={0.5} width={50} height={50} rx={25} fill="currentColor" fillOpacity={0.87} />
    <path
      d="M25 25.5a5.832 5.832 0 0 0 5.833-5.833A5.832 5.832 0 0 0 25 13.833a5.832 5.832 0 0 0-5.834 5.834A5.832 5.832 0 0 0 25 25.5Zm0 2.917c-3.894 0-11.667 1.954-11.667 5.833v2.917h23.333V34.25c0-3.88-7.773-5.833-11.666-5.833Z"
      fill="#fff"
    />
  </svg>
)

export default SvgComponent
