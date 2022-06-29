import Page from '@/components/Page'
// import { Button, Heading, LabelText, Link, Select, Table, Tabs } from 'govuk-react'
// import Page from '@/components/Page'
import { SyntheticEvent, useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Card,
  Grid,
  Link,
  Typography,
  Divider,
  Slider
} from '@mui/material'

import ExampleTab from '@/components/ExampleTab'
import ExampleAutoComplete from '@/components/icons/ExampleAutoComplete'
import ExampleCustomList from '@/components/ExampleCustomList'
import ExampleSwitchGroup from '@/components/ExampleSwitchGroup'

const SkillsPage = () => {
  return (
    <Page>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Account
        </Link>
        <Typography color="text.primary">Skills</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Card sx={{ padding: '20px', height: '100%' }}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              Search for your skillset
            </Typography>
            <ExampleAutoComplete />

            <Box sx={{ padding: '30px' }}>
              <Divider variant="middle" />
            </Box>

            <Typography>Coding</Typography>
            <Box width={300}>
              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
            </Box>

            <Typography>Drawing</Typography>
            <Box width={300}>
              <Slider defaultValue={20} aria-label="Default" valueLabelDisplay="auto" />
            </Box>

            <Typography>Speaking</Typography>
            <Box width={300}>
              <Slider defaultValue={80} aria-label="Default" valueLabelDisplay="auto" />
            </Box>

            <Typography>Maths</Typography>
            <Box width={300}>
              <Slider defaultValue={10} aria-label="Default" valueLabelDisplay="auto" />
            </Box>

            <Box sx={{ padding: '30px' }}>
              <Divider variant="middle" />
            </Box>

            <ExampleSwitchGroup />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ padding: '20px', height: '100%' }}>
            <ExampleTab />
          </Card>
        </Grid>
      </Grid>
    </Page>
  )
}

export default SkillsPage
