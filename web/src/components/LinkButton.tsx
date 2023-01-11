import { ComponentProps, FC, ReactNode } from 'react'
import { Button } from '@mui/material'
import NextLink from 'next/link'

type Props = {
  href: string
  children: ReactNode
} & ComponentProps<typeof Button>

const LinkButton: FC<Props> = ({ href, children, ...props }) => (
  <NextLink href={href} passHref>
    <Button variant="contained" {...props}>
      {children}
    </Button>
  </NextLink>
)
export default LinkButton
