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
    viewBox="0 0 512.021 512.021"
    xmlSpace="preserve"
    width="1em"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M301.258 256.01 502.645 54.645c12.501-12.501 12.501-32.769 0-45.269-12.501-12.501-32.769-12.501-45.269 0L256.01 210.762 54.645 9.376c-12.501-12.501-32.769-12.501-45.269 0s-12.501 32.769 0 45.269L210.762 256.01 9.376 457.376c-12.501 12.501-12.501 32.769 0 45.269s32.769 12.501 45.269 0L256.01 301.258l201.365 201.387c12.501 12.501 32.769 12.501 45.269 0 12.501-12.501 12.501-32.769 0-45.269L301.258 256.01z" />
  </svg>
)

export default SvgComponent
