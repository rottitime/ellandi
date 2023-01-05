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
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
    aria-labelledby={titleId}
    fill="currentColor"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M170.698 448H72.757a8.746 8.746 0 0 1-8.725-8.725V72.725A8.746 8.746 0 0 1 72.757 64h97.941c17.673 0 32-14.327 32-32s-14.327-32-32-32H72.757C32.611.047.079 32.58.032 72.725v366.549C.079 479.42 32.611 511.953 72.757 512h97.941c17.673 0 32-14.327 32-32s-14.327-32-32-32z" />
    <path d="m483.914 188.117-82.816-82.752c-12.501-12.495-32.764-12.49-45.259.011s-12.49 32.764.011 45.259l72.789 72.768-289.941.597c-17.673 0-32 14.327-32 32s14.327 32 32 32l291.115-.533-73.963 73.963c-12.042 12.936-11.317 33.184 1.618 45.226 12.295 11.445 31.346 11.436 43.63-.021l82.752-82.752c37.491-37.49 37.491-98.274.001-135.764l-.001-.001.064-.001z" />
  </svg>
)

export default SvgComponent
