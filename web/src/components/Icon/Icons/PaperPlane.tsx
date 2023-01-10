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
    data-name="Isolation Mode"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1.77 6.215A2.433 2.433 0 0 0 0 8.611a2.474 2.474 0 0 0 .771 1.71L4 13.548V20h6.448l3.265 3.267a2.4 2.4 0 0 0 1.706.713 2.438 2.438 0 0 0 .618-.08 2.4 2.4 0 0 0 1.726-1.689L24-.016Zm1.763 2.641 13.209-3.7L7 14.9v-2.574Zm11.6 11.6L11.675 17H9.1l9.734-9.741Z" />
  </svg>
)

export default SvgComponent
