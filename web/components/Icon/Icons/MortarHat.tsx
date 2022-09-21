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
    <g clipPath="url(#a)">
      <path
        d="M10.417 27.958v5.854a4.19 4.19 0 0 0 2.166 3.667L23 43.166c1.25.688 2.75.688 4 0l10.417-5.687a4.19 4.19 0 0 0 2.166-3.667v-5.854L27 34.833a4.137 4.137 0 0 1-4 0l-12.583-6.875ZM23 7.833 5.437 17.416c-1.437.792-1.437 2.875 0 3.667L23 30.666c1.25.688 2.75.688 4 0l16.75-9.146v12.313a2.09 2.09 0 0 0 2.083 2.083 2.09 2.09 0 0 0 2.084-2.083V20.479c0-.771-.417-1.459-1.084-1.834L27 7.833a4.25 4.25 0 0 0-4 0Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(0 .5)" d="M0 0h50v50H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgComponent
