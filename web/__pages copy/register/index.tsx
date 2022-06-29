import { Heading } from 'govuk-react'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Paragraph from '@/components/P'

const Page = () => (
  <Layout>
    <Heading size="MEDIUM">
      Hi <Link href="#">joe.bloggs@cabinetoffice.gov.uk</Link>
    </Heading>

    <Text>
      You are invited to register on Civil Service Skills. Please select the following
      link to sign up:
    </Text>

    <Text>
      <Link href="/register/page2">
        http://skills.civilservice.gov.uk/signup/123AbcDefgh1238910ABCdefghk
      </Link>
    </Text>
    <Text>
      The above is a one-time-only link; you can only use this link once. If you use this
      link more than once, your invitation expires and you will not be able to sign up to
      Civil Service Skills.
    </Text>
    <Text>
      Please contact{' '}
      <Link href="mailto:mailto:support.learn@csskills.gov.uk">
        support.learn@csskills.gov.uk
      </Link>{' '}
      if you need the sign-up link to be resent.
    </Text>

    <Text>
      Regards
      <br />
      skills.civilservice Team
    </Text>
  </Layout>
)

export default Page
