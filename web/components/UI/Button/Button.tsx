import { FC, forwardRef } from 'react'
import { LoadingButton as MuiButton } from '@mui/lab'
import Link from 'next/link'
import { Props, ButtonOverrides } from './types'
import { styled } from '@mui/material'

const StyledButton = styled(MuiButton)`
  &.MuiButton-containedError:hover {
    background-color: #9d1a1a;
  }

  &.MuiButton-outlinedTertiary:hover {
    color: ${(p) => p.theme.colors.white};
    background-color: ${(p) => p.theme.colors.black};
  }
`

const Button = forwardRef<HTMLButtonElement, Props>(({ href, ...rest }, ref) => {
  // const Button: FC<Props> = ({ href, ...rest }) => {
  const routeProps = href ? { component: 'a', to: href } : {}
  const props = { ...routeProps, ...overrides[rest.color], ref: ref, ...rest }

  return href ? (
    <Link href={href} passHref>
      <StyledButton {...props} />
    </Link>
  ) : (
    <StyledButton {...props} />
  )
})

Button.displayName = 'Button'

export default Button

export const overrides: ButtonOverrides = {
  primary: { variant: 'contained' },
  secondary: { variant: 'contained' },
  tertiary: { variant: 'outlined' },
  error: { variant: 'contained' }
}
