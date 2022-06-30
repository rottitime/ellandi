import { Button, ButtonArrow, Heading, ListItem, UnorderedList } from 'govuk-react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { Text } from '@/components/UI/Shared/Shared'

const Page = () => (
  <>
    <Heading>Civil Service Skills &amp; Learning</Heading>
    <Text variant="h1">Civil Service Skills &amp; Learning</Text>

    <Text>You can use this service to</Text>
    <UnorderedList>
      <ListItem>upload and maintain your skills profile</ListItem>
      <ListItem>specify any skills youd like to develop in the future</ListItem>
      <ListItem>view job suggestions based on your skills</ListItem>
      <ListItem>find courses based on your interests</ListItem>
      <ListItem>help you plan the next steps in your career</ListItem>
      <ListItem>facilitate discussions about skills with your line manager</ListItem>
    </UnorderedList>
    <Text>Registering takes around 5 -10 minutes.</Text>

    <Link href="/register/page3" passHref>
      <Button
        icon={<ButtonArrow />}
        start
        // onClick={() => {
        //   navigate('/page3')
        // }}
      >
        Start now
      </Button>
    </Link>

    <Heading size="MEDIUM">Before you start</Heading>
    <Text>
      You'll be asked to upload your CV. If you don't have a CV available you can add one
      later by going to your Profile.
    </Text>
  </>
)

export default Page

Page.getLayout = (page) => <Layout>{page}</Layout>
