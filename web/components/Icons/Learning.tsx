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
        d="M25 50.5c13.807 0 25-11.193 25-25S38.807.5 25 .5 0 11.693 0 25.5s11.193 25 25 25Z"
        fill="currentColor"
      />
      <path
        d="m41.338 21.052-15.986-5.644a1.103 1.103 0 0 0-.516-.05h-.005a.826.826 0 0 0-.184.05L8.662 21.052c-.43.148-.72.556-.72 1.01 0 .455.29.864.72 1.012l5.868 2.074v7.993c0 .944.628 1.624 1.154 2.027.582.444 1.343.817 2.329 1.139 1.89.613 4.372.945 6.992.945s5.102-.337 6.992-.945c.985-.317 1.746-.69 2.328-1.139.526-.403 1.15-1.083 1.15-2.027v-7.998l4.448-1.568v4.606a1.062 1.062 0 0 0 1.067 1.083c.286 0 .557-.112.761-.316.2-.205.312-.48.307-.762v-6.118c0-.46-.286-.868-.72-1.016Zm-3.57 1L25 26.573l-12.784-4.51L25 17.539l12.768 4.515Zm-21.103 3.841 7.987 2.82c.225.076.475.076.7 0l7.983-2.82v7.232s-.02.118-.317.347c-.342.266-.965.552-1.696.787-1.665.536-3.968.848-6.322.848-2.355 0-4.658-.307-6.323-.848-.73-.235-1.354-.526-1.696-.787-.29-.224-.316-.342-.316-.342v-7.237Z"
        fill="#fff"
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
