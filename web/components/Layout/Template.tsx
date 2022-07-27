import { Container as MuiContainer, ContainerProps, styled } from '@mui/material'
import { FC } from 'react'

type Props = ContainerProps

const Container = styled(MuiContainer)`
  padding: 0 ${({ disableGutters, theme }) => (disableGutters ? 0 : theme.spacing(3))};
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 100vh;
  }

  main {
    min-height: 100%;
  }
`

const Template: FC<Props> = ({ children, ...props }) => (
  <Container maxWidth="xl" {...props}>
    <main>{children}</main>
  </Container>
)

export default Template
