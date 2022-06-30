import {
  Checkbox,
  GridCol,
  GridRow,
  Heading,
  InputField,
  LabelText,
  LeadParagraph,
  Pagination,
  SectionBreak,
  Select,
  Tag
} from 'govuk-react'
import AccountLayout from '@/components/AccountLayout'
import styled, { useTheme } from 'styled-components'
import GreyLinkList from '@/components/UI/GreyLinkList'
import Link from '@/components/UI/Link'
import { Text } from '@/components/UI/Shared/Shared'
import Star from '@/components/svg/Star'
import Forecasting from '@/components/svg/Forecasting'
import Card from '@/components/UI/Card'
import Careers from '@/components/svg/Careers'

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

const listPathway = [
  { title: 'Analysis', url: '#' },
  { title: 'Commercial and Procurement', url: '#' },
  { title: 'Communications', url: '#' },
  { title: 'Counter Fraud', url: '#' },
  { title: 'Digital, Data and Technology', url: '#' },
  { title: 'View more', url: '#' }
]

const Page = () => {
  const theme = useTheme()

  return (
    <>
      <Heading style={{ color: theme.palette.profile.careers.color }}>
        <Careers style={{ marginRight: '10px' }} />
        Careers
      </Heading>

      <LeadParagraph>
        Career suggestions are based on your current skills and skills you would like to
        develop. <Link href="#">Change these preferences</Link>.
      </LeadParagraph>

      <GridRow>
        <GridCol setWidth="one-third">
          <GreyBox>
            <Text>
              <b>Filter by:</b>
            </Text>
            <InputField
              hint={<>Enter a postcode, town or region</>}
              input={{
                name: 'group1'
              }}
            >
              Location
            </InputField>

            <Text>Search distance</Text>
            <GridRow>
              <GridCol setWidth="one-half">
                <Select
                  label=""
                  input={{
                    name: 'group1'
                  }}
                >
                  <option value="0">GOV.UK elements option 1</option>
                  <option value="1">GOV.UK elements option 2</option>
                  <option value="2">GOV.UK elements option 3</option>
                </Select>
              </GridCol>
              <GridCol setWidth="one-half">
                <Select label="" input={{ name: 'group1' }}>
                  <option value="0">GOV.UK elements option 1</option>
                  <option value="1">GOV.UK elements option 2</option>
                  <option value="2">GOV.UK elements option 3</option>
                </Select>
              </GridCol>
            </GridRow>

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
              <Select input={{ name: 'group1' }} label={item} key={item}>
                <option value="0">GOV.UK elements option 1</option>
                <option value="1">GOV.UK elements option 2</option>
                <option value="2">GOV.UK elements option 3</option>
              </Select>
            ))}
          </GreyBox>

          <SectionBreak level="LARGE" visible />

          <GreyLinkList title="Suggested career pathways" items={listPathway} />
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
                <Select label="Order by:">
                  <option value="0">Most relevant</option>
                </Select>
              </LabelText>
            </label>

            <Checkbox>&pound;Free only</Checkbox>
          </div>

          {results.map((result) => (
            <Card key={result.title}>
              <header
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Heading as="h2" size="S" style={{ margin: 0 }}>
                  <Link href="#">
                    <Forecasting style={{ marginRight: '10px' }} />
                    {result.title}
                  </Link>
                </Heading>

                <Link href="#">
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
            </Card>
          ))}
        </GridCol>
      </GridRow>
    </>
  )
}

export default Page
Page.getLayout = (page) => <AccountLayout activeMenu={3}>{page}</AccountLayout>
