import {
  Checkbox,
  GridCol,
  GridRow,
  Heading,
  LabelText,
  LeadParagraph,
  Pagination,
  SectionBreak,
  Select,
  Tag
} from 'govuk-react'
import AccountLayout from '@/components/AccountLayout'
import styled, { useTheme } from 'styled-components'
import Learning from '@/components/svg/Learning'
import GreyLinkList from '@/components/UI/GreyLinkList'
import Link from '@/components/UI/Link'
import { Text } from '@/components/UI/Shared/Shared'
import Star from '@/components/svg/Star'
import Forecasting from '@/components/svg/Forecasting'
import Communities from '@/components/svg/Communities'
import Card from '@/components/UI/Card'

const CommunityList = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
`

const listCommunities = [
  {
    title: 'Learn UX Design Network',
    members: '6,254',
    recent: 'How do I vertically align in Figma?',
    posted: '25m ago'
  },
  {
    title: 'Agile Learning Network',
    members: '231',
    recent: 'Next bitesized agile learning course details',
    posted: '15m ago'
  },
  {
    title: 'GBS Events Network',
    members: '6,254',
    recent: 'Civil Service Live 2023 ',
    posted: '2d ago'
  },
  {
    title: 'Interaction Designers Network',
    members: '96',
    recent: 'Is there a repository for gov design assets like fonts etc?',
    posted: '7d ago'
  },
  {
    title: 'Strategic Workforce Planning Network',
    members: '163',
    recent: "July's monthly meeting agenda",
    posted: '12d ago'
  },
  {
    title: 'User Centred Design Network',
    members: '3,152',
    recent: 'Looking for focus group participants',
    posted: '2m ago'
  }
]

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

const GreyBox = styled('div')`
  background-color: ${(p) => p.theme.colors.greyLight};
  padding: 13px;
`

const learningItems = [
  { title: 'Foundations of public admin', url: '#' },
  { title: 'Working in government', url: '#' },
  { title: 'Leading and managing', url: '#' },
  { title: 'Specialist skills', url: '#' },
  { title: 'Domain knowledge', url: '#' }
]

const filters = [
  'Commercial awareness (1)',
  'Communication (2)',
  'Data management (1)',
  'Financial management (2)',
  'Forecasting (1)',
  'Influencing (2)',
  'Managing budgets (1)',
  'Numeracy (1)',
  'Presenting (1)'
]

const Page = () => {
  const theme = useTheme()

  return (
    <>
      <Heading style={{ color: theme.palette.profile.communities.color }}>
        <Communities style={{ marginRight: '10px' }} />
        Communities
      </Heading>
      <LeadParagraph>
        Start a conversation, share your views, ask a question.
      </LeadParagraph>
      <Heading as="h2" size="S">
        My communities
      </Heading>

      <CommunityList>
        {listCommunities.map((community) => (
          <Card key={community.title} noMargin>
            <Heading as="h3" size="S">
              <Link href="#">{community.title}</Link>
            </Heading>
            <Text>
              <b>Members:</b> {community.members}
              <br />
              <b>Recent:</b> {community.recent}
              <br />
              <b>Posted:</b> {community.posted}
            </Text>
          </Card>
        ))}
      </CommunityList>

      <GridRow>
        <GridCol setWidth="one-third">
          <GreyBox>
            <Text>
              <b>Filter by the skills you'd like to develop</b>
            </Text>

            <Text>All (10)</Text>
            {filters.map((filter) => (
              <Text key={filter}>
                <Link key={filter} href="#">
                  {filter}
                </Link>
              </Text>
            ))}

            {['Type of learning', 'Profession', 'Function', 'Department'].map((label) => (
              <Select
                key={label}
                input={{
                  name: 'group1',
                  onChange: function noRefCheck() {}
                }}
                label={label}
                style={{ width: '100%' }}
              >
                <option value="0">GOV.UK elements option 1</option>
                <option value="1">GOV.UK elements option 2</option>
                <option value="2">GOV.UK elements option 3</option>
              </Select>
            ))}
          </GreyBox>

          <SectionBreak level="LARGE" visible />

          <GreyLinkList title="Browse learning strands" items={learningItems} />
        </GridCol>
        <GridCol setWidth="two-thirds">
          <Pagination>
            <Pagination.Anchor href="#prev" previousPage>
              Previous page
            </Pagination.Anchor>
            <Pagination.Anchor href="#next" nextPage>
              Next page
            </Pagination.Anchor>
          </Pagination>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}
          >
            <label>
              <LabelText>
                Order by:
                <Select>
                  <option value="0">Most relevant</option>
                </Select>
              </LabelText>
            </label>

            <Checkbox>&pound;Free only</Checkbox>
          </div>

          {results.map((result) => (
            <div
              key={result.title}
              style={{
                border: `1px solid ${theme.colors.greyDark}`,
                padding: '10px',
                marginBottom: '25px'
              }}
            >
              <header
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Heading as="h2" size="S" style={{ margin: 0 }}>
                  <Link
                    href="#"
                    style={{ display: 'inline-flex', alignItems: 'center', margin: 0 }}
                  >
                    <Forecasting style={{ marginRight: '10px' }} />
                    {result.title}
                  </Link>
                </Heading>

                <Link href="#" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Star style={{ fontSize: '23px', marginRight: '5px' }} />
                  Favourite
                </Link>
              </header>
              <Text>
                <b>Duration:</b> {result.Duration}
              </Text>
              <Text>
                <b>Skills you will develop:</b> {result.develop}
              </Text>
              <SectionBreak level="" visible />
              <Text>
                {result.content} <Link href="#">Read more</Link>
              </Text>

              <Tag>specialist skills</Tag>
            </div>
          ))}
        </GridCol>
      </GridRow>
    </>
  )
}

export default Page
Page.getLayout = (page) => <AccountLayout activeMenu={4}>{page}</AccountLayout>
