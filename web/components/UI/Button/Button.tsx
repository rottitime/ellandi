import { FC } from 'react'
import { LoadingButton as MuiButton } from '@mui/lab'
import Link from 'next/link'
import { Props, ButtonOverrides } from './types'

const Button: FC<Props> = ({ href, ...rest }) => {
  const routeProps = href ? { component: 'a', to: href } : {}
  const props = { ...routeProps, ...overrides[rest.color], ...rest }

  return href ? (
    <Link href={href} passHref>
      <MuiButton {...props} />
    </Link>
  ) : (
    <MuiButton {...props} />
  )
}

export default Button

export const overrides: ButtonOverrides = {
  primary: { variant: 'contained' },
  secondary: { variant: 'contained' },
  tertiary: { variant: 'outlined' },
  error: { variant: 'contained' }
}
