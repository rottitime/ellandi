import Template from '@/components/Layout/Template'
import LinkButton from '@/components/LinkButton'
import Card from '@/components/UI/Card'
import { Divider, Grid, Typography } from '@mui/material'

const IndexPage = () => (
  <Grid container gap={5}>
    <Grid item xs>
      <Card>
        <Typography variant="h2" gutterBottom>
          Register
        </Typography>
        <LinkButton href="/register/invite">Register</LinkButton>
      </Card>
    </Grid>
    <Divider orientation="vertical" flexItem></Divider>
    <Grid item xs>
      <Card>
        <Typography variant="h2" gutterBottom>
          Sign in
        </Typography>
        <LinkButton href="/signin">Sign in</LinkButton>
      </Card>
    </Grid>
  </Grid>
)

export default IndexPage
IndexPage.getLayout = (page) => <Template>{page}</Template>
