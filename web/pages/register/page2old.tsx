import Page from '@/components/GenericPage'
import LinkButton from '@/components/LinkButton'
import { Typography } from '@mui/material'

const RegisterPage = () => (
  <Page>
    <Typography variant="h1" gutterBottom>
      Civil Service Skills &amp; Learning
    </Typography>
    <Typography gutterBottom>You can use this service to:</Typography>
    <ul>
      <li>upload and maintain your skills profile</li>
      <li>specify any skills youd like to develop in the future</li>
      <li>view job suggestions based on your skills</li>
      <li>find courses based on your interests</li>
      <li>help you plan the next steps in your career</li>
      <li>facilitate discussions about skills with your line manager</li>
    </ul>
    <Typography gutterBottom>Registering takes around 5 -10a minutes.</Typography>
    <LinkButton href="/register/page3" sx={{ mb: 5 }}>
      Start now
    </LinkButton>
    <Typography variant="h3" gutterBottom>
      Before you start
    </Typography>
    <Typography gutterBottom>
      You'll be asked to upload your CV. If you don't have a CV available you can add one
      later by going to your Profile.
    </Typography>
  </Page>
)

export default RegisterPage
