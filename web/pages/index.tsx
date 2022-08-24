import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import Button from '@/components/UI/Button/Button'
import { styled, Typography } from '@mui/material'
import { Box } from '@mui/system'

const List = styled(Box)`
  li {
    margin-bottom: ${(p) => p.theme.spacing(3)};
  }
`

const IndexPage = () => (
  <div>
    <Typography variant="subtitle1">You can use this service to:</Typography>
    <List as="ul">
      <li>upload and maintain your skills profile</li>
      <li>specify any skills you would like to develop in the future</li>
      <li>support discussions around skills development with your line manager</li>
    </List>

    <Box display="flex" justifyContent={'end'}>
      <Button variant="contained" href="/signin" color="secondary">
        Sign in
      </Button>

      <Box width={16} />

      <Button variant="contained" href="/register">
        Create account
      </Button>
    </Box>
  </div>
)

export default IndexPage
IndexPage.getLayout = (page) => (
  <CardLayout title="Civil Service Skills and Learning">{page}</CardLayout>
)
