import { Container as MuiContainer, ContainerProps, styled } from '@mui/material'
import { FC } from 'react'

const Container = styled(MuiContainer)`
  padding-left: ${({ disableGutters }) => (disableGutters ? '0px' : '16px')};
  padding-right: ${({ disableGutters }) => (disableGutters ? '0px' : '16px')};
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 100vh;
  }
`

const Template: FC<ContainerProps> = ({ children, ...props }) => (
  <Container maxWidth="xl" {...props}>
    <main>{children}</main>
  </Container>
)

export default Template
