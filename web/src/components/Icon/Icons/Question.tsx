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
    <g clipPath="url(#a)">
      <path
        d="M12.5 2.5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10Zm1 17h-2v-2h2v2Zm2.07-7.75-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2V15a3.997 3.997 0 0 1 1.17-2.83l1.24-1.26c.46-.44.68-1.1.55-1.8a1.99 1.99 0 0 0-1.39-1.53c-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3c-.58 0-.98-.56-.82-1.12a4.008 4.008 0 0 1 3.23-2.83c1.52-.24 2.97.55 3.87 1.8 1.18 1.63.83 3.38-.19 4.4Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(.5 .5)" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgComponent
