import { FC, ReactNode } from 'react'
import { Container as MuiContainer } from '@mui/material'
import AppBar from '@/components/AppBar'
import { styled } from '@mui/material/styles'
import Drawer from '@/components/Drawer'

const Container = styled(MuiContainer)`
  padding-top: 20px;
`

type Props = {
  children: ReactNode
}

const Page: FC<Props> = ({ children, ...props }) => (
  <>
    <AppBar />
    <Drawer />
    <Container maxWidth="xl" {...props}>
      {children}
      {/* <Grid container spacing={4}>
        <Grid item xs={2}>
          <Paper variant="outlined" sx={{ height: '100%' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum reprehenderit
            ex, rem quo adipisci quaerat eaque qui a reiciendis odit blanditiis
            consequatur deleniti voluptatibus expedita, officia voluptas in, eveniet ea?
          </Paper>
        </Grid>
        <Grid item xs={10}>
          {children}
        </Grid>
      </Grid> */}
    </Container>
  </>
)

export default Page
