import Page from '@/components/Page'
// import { Button, Heading, LabelText, Link, Select, Table, Tabs } from 'govuk-react'
// import Page from '@/components/Page'
import { SyntheticEvent, useState } from 'react'
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Link from '@/components/Link'

const TabPanel = styled(Box)`
  padding: 25px;
`

const IconTitle = styled(Box)`
  display: flex;
  margin-bottom: 50px;
  align-items: center;

  .icon {
    display: inline-block;
    margin-right: 20px;
  }
`

const SkillsPage = () => {
  const [value, setValue] = useState(0)
  const handleChange = (_: SyntheticEvent, newValue: number) => setValue(newValue)

  return (
    <Page>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Your skills" />
          <Tab label="Language skills" />
          <Tab label="Language skills" />
        </Tabs>
      </Box>
      <TabPanel hidden={value !== 0}>
        <IconTitle>
          <img
            src="/images/skills.svg"
            width="40"
            height="40"
            className="icon"
            alt="icon"
          />{' '}
          <Typography variant="h1">Your skills</Typography>
          <FormControl sx={{ width: '300px', marginLeft: 'auto' }}>
            <InputLabel id="demo-simple-select-label">Order by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              defaultValue={10}
            >
              <MenuItem value={10}>Most recent</MenuItem>
            </Select>
          </FormControl>
        </IconTitle>

        <TableContainer component={Paper}>
          <Table aria-label="simple table" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Skill</TableCell>
                <TableCell>Skill level</TableCell>
                <TableCell>Validated</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>Auditing</TableCell>
                <TableCell>Not set</TableCell>
                <TableCell>
                  <Image
                    height="20"
                    width="20"
                    src="/images/status_closed.svg"
                    alt="closed"
                  />
                  <Link href="#">Set skill level</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bookkeeping</TableCell>
                <TableCell>Not set</TableCell>
                <TableCell>
                  <Image
                    height="20"
                    width="20"
                    src="/images/status_closed.svg"
                    alt="closed"
                  />
                  <Link href="#">Set skill level</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Communication</TableCell>
                <TableCell>Not set</TableCell>
                <TableCell>
                  <Image
                    height="20"
                    width="20"
                    src="/images/status_closed.svg"
                    alt="closed"
                  />
                  <Link href="#">Set skill level</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Design</TableCell>
                <TableCell>Not set</TableCell>
                <TableCell>
                  <Image
                    height="20"
                    width="20"
                    src="/images/status_closed.svg"
                    alt="closed"
                  />
                  <Link href="#">Set skill level</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Enthusiasm</TableCell>
                <TableCell>Not set</TableCell>
                <TableCell>
                  <Image
                    height="20"
                    width="20"
                    src="/images/status_closed.svg"
                    alt="closed"
                  />
                  <Link href="#">Set skill level</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Microsoft Office</TableCell>
                <TableCell>Not set</TableCell>
                <TableCell>
                  <Image
                    height="20"
                    width="20"
                    src="/images/status_closed.svg"
                    alt="closed"
                  />
                  <Link href="#">Set skill level</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Negotiation</TableCell>
                <TableCell>Not set</TableCell>
                <TableCell>
                  <Image
                    height="20"
                    width="20"
                    src="/images/status_closed.svg"
                    alt="closed"
                  />
                  <Link href="#">Set skill level</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Project management</TableCell>
                <TableCell>Not set</TableCell>
                <TableCell>
                  <Image
                    height="20"
                    width="20"
                    src="/images/status_closed.svg"
                    alt="closed"
                  />
                  <Link href="#">Set skill level</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel hidden={value !== 1}>
        <IconTitle>
          <img
            src="/images/skills.svg"
            width="40"
            height="40"
            className="icon"
            alt="icon"
          />
          <Typography variant="h1">Language skills</Typography>
        </IconTitle>

        <TableContainer component={Paper}>
          <Table>
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
                  <Chip label="PROFICIENT" />
                </TableCell>
                <TableCell>
                  <Chip label="PROFICIENT" />
                </TableCell>
                <TableCell>
                  <Link href="#">Change</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>French</TableCell>
                <TableCell>
                  <Chip label="BASIC" />
                </TableCell>
                <TableCell>
                  <Chip label="INDEPENDENT" />
                </TableCell>
                <TableCell>
                  <Link href="#">Change</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel hidden={value !== 2}>
        <IconTitle>
          <img
            src="/images/skills.svg"
            width="40"
            height="40"
            className="icon"
            alt="icon"
          />{' '}
          <Typography variant="h1">Skills you'd like to develop</Typography>
        </IconTitle>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Skill</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Link href="#">Collaboration</Link>
                </TableCell>
                <TableCell>
                  <Link href="#">Remove</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="#">Customer service</Link>
                </TableCell>
                <TableCell>
                  <Link href="#">Remove</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="#">Health and wellbeing</Link>
                </TableCell>
                <TableCell>
                  <Link href="#">Remove</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="#">Independence</Link>
                </TableCell>
                <TableCell>
                  <Link href="#">Remove</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="#">Job coaching</Link>
                </TableCell>
                <TableCell>
                  <Link href="#">Remove</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="#">Market research</Link>
                </TableCell>
                <TableCell>
                  <Link href="#">Remove</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="#">Risk management</Link>
                </TableCell>
                <TableCell>
                  <Link href="#">Remove</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Page>
  )
}

export default SkillsPage
