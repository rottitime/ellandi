import { ComponentProps, FC, ReactNode } from 'react'
import { Link as MuiLink } from '@mui/material'
import NextLink from 'next/link'

type Props = {
  href: string
  children: ReactNode
} & ComponentProps<typeof MuiLink>

const Link: FC<Props> = ({ href, ...props }) => (
  <NextLink href={href} passHref>
    <MuiLink {...props} />
  </NextLink>
)
export default Link
