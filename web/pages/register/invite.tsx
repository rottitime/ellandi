import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import Link from '@/components/UI/Link'
import { Typography } from '@mui/material'

const RegisterPage = () => (
  <>
    <Typography gutterBottom>
      You are invited to register for Civil Service Skills and Learning.
    </Typography>
    <Typography gutterBottom>
      You can <Link href="/register">register with this one time only link</Link>. If you
      use the link more than once, your invitation will expire.
    </Typography>
    <Typography gutterBottom>
      You need to contact{' '}
      <Link href="mailto:mailto:support.learn@csskills.gov.uk">
        support.learn@csskills.gov.uk
      </Link>{' '}
      if you need the registration link to be resent.
    </Typography>
    <Typography gutterBottom>
      Regards
      <br />
      Civil Service Skills and Learning team
    </Typography>
  </>
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <CardLayout showPromo={true} title="Hi Joe Bloggs">
    {page}
  </CardLayout>
)
