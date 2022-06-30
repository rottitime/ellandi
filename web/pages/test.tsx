import { Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from '@/components/Link'
import Page from '@/components/Page'

const MyBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid red;
`

const TestPage = () => (
  <>
    <MyBox
      sx={{
        my: 5
      }}
    >
      <Typography component="h1" color="primary">
        Material UI v5 with Next.js in TypeScript
      </Typography>
      <Typography component="h2" color="secondary">
        Boilerplate for building faster.
        <Link href="/">Link</Link>
      </Typography>
    </MyBox>
  </>
)

export default TestPage
TestPage.getLayout = (page) => <Page>{page}</Page>
