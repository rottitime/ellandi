import { FC, ReactNode } from 'react'
import NextLink from 'next/link'
import { Link as GovLink } from 'govuk-react'

type Props = {
  href: string
  children: ReactNode
}

const Link: FC<Props> = ({ href, ...props }) => (
  <NextLink href={href} passHref>
    <GovLink {...props} />
  </NextLink>
)
export default Link
