import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  Pagination,
  Select,
  styled,
  TextField,
  Typography
} from '@mui/material'
import AccountMenuPage from '@/components/AccountMenuPage'
import Card from '@/components/UI/Card'
import Link from '@/components/UI/Link'
import Divider from '@/components/UI/Divider'
import LearningStrands from '@/components/LearningStrands'
import ContentBox from '@/components/ContentBox'
import Forecasting from '@/components/Icons/Forecasting'
import { StarBorder } from '@mui/icons-material'
import Careers from '@/components/Icons/Careers'

const results = [
  {
    title: 'Forecasting',
    Duration: '85 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets',
    content:
      'Discover the skills to create accurate forecasts and to make sure they are adopted and used by your organisation. Read more'
  },
  {
    title: 'VAT and PAYE',
    Duration: '85 minutes',
    develop: 'Financial management, Numeracy, Communication, Commercial awareness',
    content:
      "These are 2 issues that it's essential to get right - and costly to get wrong. Read more"
  },
  {
    title: 'Data visualisation 201: getting your message across',
    Duration: '20 minutes',
    develop:
      'Presenting, Communication, Data management, Data visualisation, Influencing',
    content:
      'Finance professionals often need to create a proposal or presentation which includes data visualisations. Build on what you learned in Data visualisation 101. Read more'
  },
  {
    title: 'Finance  business partnering 101',
    Duration: '30 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets',
    content:
      'Discover what capabilities are needed by a finance business partner. Read more'
  },
  {
    title: 'Finance skills for all 5: budget management',
    Duration: '20 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets',
    content:
      'This module explores some of the issues relevant to managing the financial parts of the planning processes, such as budgets. Read more'
  },
  {
    title: 'Finance skills for all 6: strategic business planning',
    Duration: '20 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets',
    content:
      'This module describes the business models used in central government and how to decide which is the most appropriate. Read more'
  },
  {
    title: 'Finance skills for all 7: investment appraisal',
    Duration: '20 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets',
    content:
      "On this module you'll learn how proposals should be judged before committing significant funds and how to evaluate past and present activities. Read more"
  },
  {
    title: 'Finance skills for all 9: performance indicators',
    Duration: '20 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets',
    content:
      'Performance indicators help government departments understand how well it is performing against expectations and whether actions are effective. Read more'
  },
  {
    title: 'Finance skills for all  11: corporate finance',
    Duration: '25 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets',
    content:
      'Corporate finance promotes your awareness of issues when considering how new activities can be financed and motivations when engaging with the public sector. Read more'
  },
  {
    title: 'Finance skills for all 3: accruals-based management (part 1)',
    Duration: '20 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets',
    content:
      'Part 1 explains how accruals based management helps managers of public services make decisions. Read more'
  }
]

const list = [
  { title: 'Analysis', url: '#' },
  { title: 'Commercial and Procurement', url: '#' },
  { title: 'Communications', url: '#' },
  { title: 'Counter Fraud', url: '#' },
  { title: 'Digital, Data and Technology', url: '#' },
  { title: 'View more', url: '#' }
]

const Header = styled('header')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  > .MuiTypography-root {
    display: flex;
    align-items: center;
  }
`

const Page = () => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Career suggestions are based on your current skills and skills you would like to
        develop. <Link href="#">Change these preferences</Link>.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Card>
            <Typography variant="h3" gutterBottom>
              Filter by the skills you'd like to develop
            </Typography>

            <TextField
              label="Location"
              helperText="Enter a postcode, town or region"
              size="small"
              margin="normal"
              fullWidth
            />

            <Grid container spacing={4}>
              <Grid item xs={6}>
                <TextField
                  label="Seaarch distance"
                  size="small"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField size="small" margin="normal" fullWidth />
              </Grid>
            </Grid>

            {[
              'Job role',
              'Organisation',
              'Profession',
              'Function',
              'Minimum salary',
              'Job grade',
              'Working pattern',
              'Contract type'
            ].map((item) => (
              <FormControl fullWidth key={item} sx={{ mb: 3 }} size="small">
                <InputLabel>{item}</InputLabel>
                <Select label={item}>
                  <option value="0">GOV.UK elements option 1</option>
                  <option value="1">GOV.UK elements option 2</option>
                  <option value="2">GOV.UK elements option 3</option>
                </Select>
              </FormControl>
            ))}

            <Divider variant="middle" spacing={20} />

            <LearningStrands list={list} title="Suggested career pathways" />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card fullHeight>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
              <Pagination count={10} shape="rounded" size="large" />
            </Box>

            {results.map((result) => (
              <ContentBox key={result.title} sx={{ mb: 3 }}>
                <Header>
                  <Typography variant="h3">
                    <Link href="#">
                      <Forecasting style={{ marginRight: '10px' }} />
                      {result.title}
                    </Link>
                  </Typography>

                  <Link href="#">
                    <StarBorder style={{ fontSize: '23px', marginRight: '5px' }} />
                    Favourite
                  </Link>
                </Header>
                <Typography>
                  <b>Duration:</b> {result.Duration}
                </Typography>
                <Typography>
                  <b>Skills you will develop:</b> {result.develop}
                </Typography>
                <Divider variant="middle" spacing={20} />

                <Typography>
                  {result.content} <Link href="#">Read more</Link>
                </Typography>

                <Box sx={{ textAlign: 'right' }}>
                  <Chip label="specialist skills" />
                </Box>
              </ContentBox>
            ))}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Page
Page.getLayout = (page) => (
  <AccountMenuPage
    breadcrumbs={[{ title: 'Careers' }]}
    title={
      <>
        <Careers />
        Careers
      </>
    }
  >
    {page}
  </AccountMenuPage>
)
