import Page from '@/components/GenericPage'
import Link from '@/components/Link'
import { Typography } from '@mui/material'

const RegisterPage = () => (
  <Page>
    <Typography variant="h1" gutterBottom>
      Hi <Link href="#">joe.bloggs@cabinetoffice.gov.uk</Link>
    </Typography>

    <Typography gutterBottom>
      You are invited to register on Civil Service Skills. Please select the following
      link to sign up:
    </Typography>

    <Typography gutterBottom>
      <Link href="/register/page2">
        http://skills.civilservice.gov.uk/signup/123AbcDefgh1238910ABCdefghk
      </Link>
    </Typography>
    <Typography gutterBottom>
      The above is a one-time-only link; you can only use this link once. If you use this
      link more than once, your invitation expires and you will not be able to sign up to
      Civil Service Skills.
    </Typography>
    <Typography gutterBottom>
      Please contact{' '}
      <Link href="mailto:mailto:support.learn@csskills.gov.uk">
        support.learn@csskills.gov.uk
      </Link>{' '}
      if you need the sign-up link to be resent.
    </Typography>

    <Typography gutterBottom>
      Regards
      <br />
      skills.civilservice Team
    </Typography>
  </Page>
)

export default RegisterPage
