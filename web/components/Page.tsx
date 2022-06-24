import { FC, ReactNode } from 'react'
import { Container as MuiContainer } from '@mui/material'
import AppBar from '@/components/AppBar'
import { styled } from '@mui/material/styles'

const Container = styled(MuiContainer)`
  padding-top: 20px;
`

type Props = {
  children: ReactNode
}

const Page: FC<Props> = ({ children }) => (
  <>
    <AppBar />
    <Container maxWidth="xl">
      <>{children}</>
    </Container>
  </>
)

export default Page
