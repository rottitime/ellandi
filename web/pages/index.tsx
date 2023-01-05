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
  <>
    <Typography>You can use this service to:</Typography>
    <List as="ul">
      <li>upload and maintain your skills and learning profile</li>
      <li>specify any skills you would like to develop in the future</li>
      <li>find courses and development opportunities</li>
      <li>
        support discussions about skills and career development with your line manager
      </li>
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
  </>
)

export default IndexPage
IndexPage.getLayout = (page) => <CardLayout dark>{page}</CardLayout>
