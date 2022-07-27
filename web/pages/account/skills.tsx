import AccountLayout from '@/components/Layout/AccountLayout'
import {
  Box,
  Chip,
  Grid,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import Link from '@/components/UI/Link'
import Skills from '@/components/Icons/Skills'
import Card from '@/components/UI/Card'

const TabPanel = styled(Box)`
  padding: 25px;
  .MuiTypography-h2 {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const SkillsPage = () => {
  const [value, setValue] = useState(0)
  const handleChange = (_: SyntheticEvent, newValue: number) => setValue(newValue)

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card sx={{ padding: '20px', height: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Your skills" />
                  <Tab label="Language skills" />
                  <Tab label="Skills you'd like to develop" />
                </Tabs>
              </Box>
              <TabPanel hidden={value !== 0}>
                <Typography variant="h2" gutterBottom>
                  <Skills /> Skill
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
                <Typography variant="h2" gutterBottom>
                  {' '}
                  <Skills /> Language skills
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
                <Typography variant="h2" gutterBottom>
                  <Skills /> Skills you'd like to develop
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
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default SkillsPage
SkillsPage.getLayout = (page) => (
  <AccountLayout title="Skills" breadcrumbs={[{ title: 'Skills' }]}>
    {page}
  </AccountLayout>
)
