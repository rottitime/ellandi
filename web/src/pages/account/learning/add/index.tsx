import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Headline from '@/components/Account/Headline/Headline'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import Router from 'next/router'
import { FC } from 'react'
import Tooltip from '@/components/UI/Tooltip/Tooltip'

type MenuDataType = {
  title: string
  url: string
  description: string
}

type SectionOneProps = {
  active: string
}

const LearningAddPage = () => <SectionOne active="" />

export default LearningAddPage

LearningAddPage.getLayout = (page) => (
  <AccountLayout
    title="Learning"
    titleIcon="mortar-hat"
    brandColor="brandLearning"
    breadcrumbs={[
      { title: 'Learning', url: '/account/learning' },
      { title: 'Add learning' }
    ]}
  >
    {page}
  </AccountLayout>
)

export const menu: MenuDataType[] = [
  {
    title: 'On the job',
    url: '/account/learning/add/on-the-job',
    description:
      'Self-taught learning by doing, for example reading policies and guidance, using tools and software to do your job'
  },
  {
    title: 'Social',
    url: '/account/learning/add/social',
    description:
      'Learning from colleagues, job shadowing, mentoring, coaching, networks and communities'
  },
  {
    title: 'Formal',
    url: '/account/learning/add/formal',
    description:
      'Completing a course on Civil Service Learning, external training, professional qualifications'
  }
]

export const SectionOne: FC<SectionOneProps> = ({ active }) => (
  <>
    <Headline>
      <Typography variant="h1" gutterBottom>
        Add learning
      </Typography>
    </Headline>

    <AccountCard
      sx={{ maxWidth: 430, marginBottom: 4 }}
      header={
        <Typography component="h2">
          <BadgeNumber label="1" sx={{ mr: 2 }} />
          Choose a learning type
        </Typography>
      }
    >
      <RadioGroup aria-labelledby="Choose a skill or language type" defaultValue={active}>
        {menu.map(({ title, url, description }) => (
          <FormControlLabel
            key={title}
            value={title}
            control={<Radio />}
            label={
              <>
                {title}
                <Tooltip brandColor="brandLearning" title={description} />
              </>
            }
            onClick={async () => await Router.push(url)}
          />
        ))}
      </RadioGroup>
    </AccountCard>
  </>
)
