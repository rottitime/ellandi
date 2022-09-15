import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Headline from '@/components/Account/Headline/Headline'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import Router from 'next/router'
import { FC } from 'react'

type MenuDataType = {
  title: string
  url: string
}

type SectionOneProps = {
  active: string
}

const SkillsAddPage = () => <SectionOne active="" />

export default SkillsAddPage

SkillsAddPage.getLayout = (page) => (
  <AccountLayout
    title="Skills"
    titleIcon="skills"
    brandColor="brandSkills"
    breadcrumbs={[
      { title: 'Skills', url: '/account/skills' },
      { title: 'Add a skill or language to your profile' }
    ]}
  >
    {page}
  </AccountLayout>
)

export const menu: MenuDataType[] = [
  {
    title: 'Skill',
    url: '/account/skills/add/skill'
  },
  {
    title: 'Skills you would like to develop',
    url: '/account/skills/add/skills-to-develop'
  },
  {
    title: 'Language',
    url: '/account/skills/add/language'
  }
]

export const SectionOne: FC<SectionOneProps> = ({ active }) => (
  <>
    <Headline>
      <Typography variant="h1" gutterBottom>
        Add a skill or language to your profile
      </Typography>
    </Headline>

    <AccountCard
      sx={{ maxWidth: 430, marginBottom: 4 }}
      header={
        <Typography component="h2">
          <BadgeNumber label="1" sx={{ mr: 2 }} />
          Choose a skill or language type
        </Typography>
      }
    >
      <RadioGroup aria-labelledby="Choose a skill or language type" defaultValue={active}>
        {menu.map(({ title, url }) => (
          <FormControlLabel
            key={title}
            value={title}
            control={<Radio />}
            label={title}
            onClick={async () => await Router.push(url)}
          />
        ))}
      </RadioGroup>
    </AccountCard>
  </>
)
