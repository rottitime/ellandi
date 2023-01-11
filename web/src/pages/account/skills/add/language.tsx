import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Box, Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { useMutation } from '@tanstack/react-query'
import { LanguageType, RegisterUserResponse } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import LanguageAddForm from '@/components/Form/Account/LanguageAddForm/LanguageAddForm'
import { addLanguages } from '@/service/account'

const SkillsAddSkillsPage = () => {
  const { authFetch } = useAuth()

  const { isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    LanguageType[]
  >(async (data) => authFetch(addLanguages, data), {
    onSuccess: async () => Router.push('/account/skills/language-skills')
  })

  return (
    <>
      <SectionOne active={menu[2].title} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            lg: 'row'
          },
          gap: 2
        }}
      >
        <Box
          sx={{
            flex: 1
          }}
        >
          <AccountCard
            sx={{
              width: '100%'
            }}
            header={
              <Typography component="h2">
                <BadgeNumber label="2" sx={{ mr: 2 }} /> Language and levels
              </Typography>
            }
          >
            <LanguageAddForm
              loading={isLoading}
              onFormSubmit={({ languages }) => mutate.mutate(languages)}
            />
          </AccountCard>
        </Box>
        <Box
          sx={{
            flex: 1
          }}
        >
          <AccountCard>
            <Typography variant="h2" gutterBottom>
              Speaking
            </Typography>
            <Typography variant="h3">Basic</Typography>
            <Typography variant="body2" gutterBottom>
              You can understand and use basic phrases, introduce yourself and describe in
              simple terms aspects of your background and environment
            </Typography>
            <Typography variant="h3">Independent</Typography>
            <Typography variant="body2" gutterBottom>
              You can deal with most situations likely to arise while travelling in an
              area where the language is spoken and interact with a degree of fluency
            </Typography>

            <Typography variant="h3">Proficient</Typography>
            <Typography variant="body2" gutterBottom>
              You can express ideas fluently and spontaneously and can use the language
              flexibly for social, academic and professional purposes
            </Typography>

            <Typography variant="h3">Native</Typography>
            <Typography variant="body2" gutterBottom>
              This is the first language you learnt as a child
            </Typography>

            <Typography variant="h2" gutterBottom>
              Writing
            </Typography>
            <Typography variant="h3">Basic</Typography>
            <Typography variant="body2" gutterBottom>
              You can understand and use basic phrases, introduce yourself and describe in
              simple terms aspects of your background and environment
            </Typography>
            <Typography variant="h3">Independent</Typography>
            <Typography variant="body2" gutterBottom>
              You can produce clear, detailed text on a wide range of subjects and explain
              the advantages and disadvantages of a topical issue
            </Typography>

            <Typography variant="h3">Proficient</Typography>
            <Typography variant="body2" gutterBottom>
              You can produce clear, well-structured, detailed text on complex subjects
              and can express yourself fluently and precisely
            </Typography>

            <Typography variant="h3">Native</Typography>
            <Typography variant="body2" gutterBottom>
              This is the first language you learnt as a child
            </Typography>
          </AccountCard>
        </Box>
      </Box>
    </>
  )
}

export default SkillsAddSkillsPage

SkillsAddSkillsPage.getLayout = (page) => (
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
