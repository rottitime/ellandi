import Layout from '@/components/UI/Layout'
import Link from '@/components/UI/Link'
import { Text } from '@/components/UI/Shared/Shared'

// const Text = () => <p>deded</p>

const IndexPage = () => (
  <>
    <Text variant="h1">
      Hi <Link href="#">joe.bloggs@cabinetoffice.gov.uk</Link>
    </Text>

    <Text>
      You are invited to register on Civil Service Skills &amp; Learning. Please select
      the following one-time-only link to sign up:
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
  </>
)

export default IndexPage

IndexPage.getLayout = (page) => <Layout>{page}</Layout>
