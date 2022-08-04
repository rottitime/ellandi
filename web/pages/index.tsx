import CardLayout from '@/components/Layout/CardLayout'
import Button from '@/components/UI/Button/Button'
import Card from '@/components/UI/Card'
import { Divider, Grid, Typography } from '@mui/material'

const IndexPage = () => (
  <Grid container gap={5}>
    <Grid item xs>
      <Card>
        <Typography gutterBottom>Register</Typography>
        <Button variant="contained" href="/register">
          Register
        </Button>
      </Card>
    </Grid>
    <Divider orientation="vertical" flexItem></Divider>
    <Grid item xs>
      <Card>
        <Typography gutterBottom>Sign in</Typography>
        <Button variant="contained" href="/signin">
          Sign in
        </Button>
      </Card>
    </Grid>
  </Grid>
)

export default IndexPage
IndexPage.getLayout = (page) => <CardLayout showPromo={false}>{page}</CardLayout>
