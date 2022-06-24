import Page from '@/components/Page'
// import { Button, Heading, LabelText, Link, Select, Table, Tabs } from 'govuk-react'
// import Layout from '@/components/Layout'
import { SyntheticEvent, useState } from 'react'
import {
  Box,
  Button,
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
import { typography } from '@mui/system'
import Image from 'next/image'
import Link from '@/components/Link'

const TabPanel = styled(Box)`
  padding: 25px;
`

const IconTitle = styled(Typography)`
  display: block;
  .icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 50px;
  }
`

// const Cell = styled(Table.Cell)`
//   vertical-align: middle;
// `

const BlueButton = styled(Button)`
  /* background-color: #1d70b8;
  margin: 0; */
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
        <IconTitle variant="h3">
          <Image
            src="/images/skills.svg"
            width="40"
            height="40"
            className="icon"
            alt="icon"
          />{' '}
          Your skills
        </IconTitle>

        <FormControl>
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
        <IconTitle variant="h3">
          <Image
            src="/images/skills.svg"
            width="40"
            height="40"
            className="icon"
            alt="icon"
          />{' '}
          Language skills
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
        <IconTitle variant="h3">
          <Image
            src="/images/skills.svg"
            width="40"
            height="40"
            className="icon"
            alt="icon"
          />{' '}
          Skills you'd like to develop
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

      {/* <Tabs>
        <Tabs.Title>Contents</Tabs.Title>
        <Tabs.List>
          <Tabs.Tab
            href="#0"
            selected={tabIndex === 0}
            onClick={(event_) => {
              event_.preventDefault()
              setTabIndex(0)
            }}
          >
            Your skills
          </Tabs.Tab>
          <Tabs.Tab
            href="#1"
            selected={tabIndex === 1}
            onClick={(event_) => {
              event_.preventDefault()
              setTabIndex(1)
            }}
          >
            Language skills
          </Tabs.Tab>
          <Tabs.Tab
            href="#2"
            selected={tabIndex === 2}
            onClick={(event_) => {
              event_.preventDefault()
              setTabIndex(2)
            }}
          >
            Skills you'd like to develop
          </Tabs.Tab>
        </Tabs.List>


        <Tabs.Panel id="1" selected={tabIndex === 1}>
          <Heading size="LARGE">
            <IconSkills src="/images/skills.svg" />
            Language skills
          </Heading>


        </Tabs.Panel>

        <Tabs.Panel id="2" selected={tabIndex === 2}>
          <Heading size="LARGE">
            <IconSkills src="/images/skills.svg" />
            Skills you’d like to develop
          </Heading>

          <label>
            <LabelText>
              Order by:
              <Select label="">
                <option value="0">Most recent</option>
              </Select>
            </LabelText>
          </label>

          <Table
            head={
              <Table.Row>
                <Table.CellHeader>Skill</Table.CellHeader>
                <Table.CellHeader>&nbsp;</Table.CellHeader>
              </Table.Row>
            }
          >
            <Table.Row>
              <Cell>
                <Link href="#">Collaboration</Link>
              </Cell>
              <Cell>
                <Link href="#">Remove</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>
                <Link href="#">Customer service</Link>
              </Cell>
              <Cell>
                <Link href="#">Remove</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>
                <Link href="#">Health and wellbeing</Link>
              </Cell>
              <Cell>
                <Link href="#">Remove</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>
                <Link href="#">Independence</Link>
              </Cell>
              <Cell>
                <Link href="#">Remove</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>
                <Link href="#">Job coaching</Link>
              </Cell>
              <Cell>
                <Link href="#">Remove</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>
                <Link href="#">Market research</Link>
              </Cell>
              <Cell>
                <Link href="#">Remove</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>
                <Link href="#">Risk management</Link>
              </Cell>
              <Cell>
                <Link href="#">Remove</Link>
              </Cell>
            </Table.Row>
          </Table>
          <Link href="#">Add a skill</Link>
        </Tabs.Panel>
      </Tabs> */}
    </Page>
  )
}

export default SkillsPage
