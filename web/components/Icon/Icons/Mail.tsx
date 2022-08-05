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
      d="M19.3 6H5.7c-.935 0-1.692.731-1.692 1.625L4 17.375C4 18.269 4.765 19 5.7 19h13.6c.935 0 1.7-.731 1.7-1.625v-9.75C21 6.731 20.235 6 19.3 6Zm-.34 3.453-6.01 3.591a.894.894 0 0 1-.9 0l-6.01-3.59a.689.689 0 0 1-.34-.586c0-.544.62-.87 1.105-.585l5.695 3.405 5.695-3.405c.485-.284 1.105.04 1.105.585a.689.689 0 0 1-.34.585Z"
      fill="#fff"
    />
  </svg>
)

export default SvgComponent
