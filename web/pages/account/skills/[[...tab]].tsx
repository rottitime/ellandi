import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import {
  Box,
  Chip,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs as MuiTbas,
  Typography
} from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import Link from '@/components/UI/Link'
import Icon from '@/components/Icon/Icon'
import Tabs, { TabItem } from '@/components/UI/Tabs/Tabs'
import Button from '@/components/UI/Button/Button'
import SkillsList from '@/components/Accounts/SkillsList/SkillsList'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, RegisterUserResponse } from '@/service/api'
import { fetchMe } from '@/service/me'
import Headline from '@/components/Accounts/Headline/Headline'

const TabPanel = styled(Box)`
  padding: 25px;
  .MuiTypography-h2 {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const SkillsPage = () => {
  const { authFetch } = useAuth()
  const { data } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe))

  const [value, setValue] = useState(0)
  const handleChange = (_: SyntheticEvent, newValue: number) => setValue(newValue)

  return (
    <>
      <Headline>
        <Typography variant="h1" gutterBottom>
          Hello {data?.first_name}, welcome to the <br />
          Skills and Learning Service
        </Typography>
      </Headline>

      <Box>
        <Button variant="contained">Add a skill</Button>

        <Tabs tabItems={tabs} activeOnUrl />

        <Box>
          <MuiTbas value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Your skills" />
            <Tab label="Language skills" />
            <Tab label="Skills you'd like to develop" />
          </MuiTbas>
        </Box>
        <TabPanel hidden={value !== 0}>
          <Typography variant="h1" gutterBottom>
            <Icon icon="skills" /> Skill
          </Typography>

          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Skill</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                'Collaboration',
                'Customer service',
                'Health and wellbeing',
                'Independence',
                'Job coaching',
                'Market research',
                'Risk management'
              ].map((skill) => (
                <TableRow key={skill}>
                  <TableCell scope="row">{skill}</TableCell>

                  <TableCell scope="row" align="right">
                    <Link href="#">Remove</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel hidden={value !== 1}>
          <Typography variant="h1" gutterBottom>
            {' '}
            <Icon icon="skills" /> Language skills
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Skill</TableCell>
                <TableCell>Speaking</TableCell>
                <TableCell>Writing</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>English</TableCell>
                <TableCell>
                  <Chip variant="outlined" label="PROFICIENT" />
                </TableCell>
                <TableCell>
                  <Chip variant="outlined" label="PROFICIENT" />
                </TableCell>
                <TableCell>
                  <Link href="#">Change</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>French</TableCell>
                <TableCell>
                  <Chip variant="outlined" label="BASIC" />
                </TableCell>
                <TableCell>
                  <Chip variant="outlined" label="INDEPENDENT" />
                </TableCell>
                <TableCell>
                  <Link href="#">Change</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel hidden={value !== 2}>
          <Typography variant="h1" gutterBottom>
            <Icon icon="skills" /> Skills you'd like to develop
          </Typography>

          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Skill</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                'Collaboration',
                'Customer service',
                'Health and wellbeing',
                'Independence',
                'Job coaching',
                'Market research',
                'Risk management'
              ].map((skill) => (
                <TableRow key={skill}>
                  <TableCell scope="row">{skill}</TableCell>
                  <TableCell scope="row" align="right">
                    <Link href="#">Remove</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
      </Box>
    </>
  )
}

export default SkillsPage
SkillsPage.getLayout = (page) => (
  <AccountLayout
    title="Skills"
    titleIcon="skills"
    breadcrumbs={[{ title: 'Skills' }]}
    brandColor="brandSkills"
  >
    {page}
  </AccountLayout>
)

export async function getStaticPaths() {
  const getIdFromHref = (href: string) =>
    href.replace('/account/skills', '').split('/').at(-1)

  return {
    paths: tabs.map(({ href }) => ({
      params: { tab: [getIdFromHref(href)] }
    })),
    fallback: false
  }
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

const tabs: TabItem[] = [
  {
    title: 'Your skills',
    content: <SkillsList />,
    href: '/account/skills'
  },
  {
    title: 'Language skills',
    content: null,
    href: '/account/skills/language-skills'
  },
  {
    title: "Skills you'd like to develop",
    content: <p>Content:skills develop</p>,
    href: '/account/skills/skills-develop'
  }
]
