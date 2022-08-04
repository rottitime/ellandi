import { FC } from 'react'
import { LoadingButton as MuiButton } from '@mui/lab'
import Link from 'next/link'
import { Props } from './types'

const Button: FC<Props> = ({ href, ...rest }) => {
  const routeProps = href ? { component: 'a', to: href } : {}
  const props = { ...rest, ...routeProps }

  return href ? (
    <Link href={href} passHref>
      <MuiButton {...props} />
    </Link>
  ) : (
    <MuiButton {...props} />
  )
}

export default Button
