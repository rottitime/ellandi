import { FC, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as GovLink } from 'govuk-react'

type Props = {
  href: string
  children: ReactNode
}

const Link: FC<Props> = ({ href, ...props }) => (
  <GovLink as={RouterLink} to={href} {...props} />
)
export default Link
