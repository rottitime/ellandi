import { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 26 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m13 3.236 1.968 6.056.224.69h7.094l-5.151 3.743-.588.428.224.69L18.74 20.9l-5.151-3.742L13 16.73l-.588.427-5.151 3.742 1.968-6.056.224-.69-.588-.428-5.151-3.742h7.094l.224-.691L13 3.236Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
)

export default SvgComponent
