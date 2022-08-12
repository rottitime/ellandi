import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'

const IndexPage = () => {
  return (
    <>
      <SectionOne active={menu[0].title} />

      <AccountCard
        header={
          <Typography variant="subtitle1" component="h2">
            <BadgeNumber label="2" sx={{ mr: 2 }} /> Skill name and levels
          </Typography>
        }
      >
        de
      </AccountCard>
    </>
  )
}

export default IndexPage

IndexPage.getLayout = (page) => (
  <AccountLayout
    breadcrumbs={[
      { title: 'Skills', url: '/account/skills' },
      { title: 'Add a skill or language to your profile' }
    ]}
  >
    {page}
  </AccountLayout>
)
