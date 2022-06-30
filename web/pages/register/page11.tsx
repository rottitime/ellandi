import { Button, ListItem, UnorderedList } from 'govuk-react'
import { Text } from '@/components/UI/Shared/Shared'
import Layout from '@/components/Layout'
import NextLink from 'next/link'
import styled from 'styled-components'

const BlueBox = styled('div')`
  background-color: ${(p) => p.theme.colors.blue};
  padding: 30px;
  color: ${(p) => p.theme.colors.white};

  ul {
    color: inherit;
  }
`

const Page = () => (
  <BlueBox>
    <Text variant="h1">
      Thank you for completing your details. We're now going to ask you about your skills,
      including:
    </Text>

    <UnorderedList>
      <ListItem>Your language skills</ListItem>
      <ListItem>Other skills that you already have</ListItem>
      <ListItem>Skills that you'd like to develop</ListItem>
    </UnorderedList>

    <NextLink href="/register/page12" passHref>
      <Button
        buttonColour="#f3f2f1"
        buttonTextColour="#0B0C0C"
        style={{ display: 'block' }}
      >
        {' '}
        Continue
      </Button>
    </NextLink>
  </BlueBox>
)

export default Page

Page.getLayout = (page) => <Layout>{page}</Layout>
