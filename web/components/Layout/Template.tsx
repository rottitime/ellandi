import { Container as MuiContainer, ContainerProps, styled } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  header?: ReactNode
} & ContainerProps

const Container = styled(MuiContainer)`
  padding: 0 ${({ disableGutters }) => (disableGutters ? '0px' : '16px')};
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 100vh;
  }
`

const Template: FC<Props> = ({ children, header, ...props }) => (
  <>
    {header}
    <Container maxWidth="xl" {...props}>
      <main>{children}</main>
    </Container>
  </>
)

export default Template
