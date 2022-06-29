import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Tab,
  Table,
  TableContainer,
  TableHead,
  Tabs,
  Typography
} from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import ExampleCustomList from './ExampleCustomList'
import ExampleTable from './ExampleTable'

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

function ExampleTab() {
  const [value, setValue] = useState(0)
  const handleChange = (_: SyntheticEvent, newValue: number) => setValue(newValue)
  return (
    <>
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

        <ExampleTable />
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

        <ExampleCustomList />
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

        <ExampleTable />
      </TabPanel>
    </>
  )
}

export default ExampleTab
