import { Typography } from '@mui/material'
import { FC, useRef } from 'react'
import { StandardRegisterProps } from './types'
import { Query, SkillsType } from '@/service/types'
import SkillsAddForm from '../Account/SkillsAddForm/SkillsAddForm'
import FormFooter from '../FormFooter'
import { useQuery } from 'react-query'
import { fetchRecommendedSkillBundle, RecommendedSkillBundleResponse } from '@/service/me'
import useAuth from '@/hooks/useAuth'
import { useUiContext } from '@/context/UiContext'

const SkillsForm: FC<StandardRegisterProps<SkillsType>> = ({
  onFormSubmit,
  buttonLoading,
  backUrl
}) => {
  const { setLoading } = useUiContext()
  const formRef = useRef(null)
  const { authFetch } = useAuth()

  const { data, isLoading } = useQuery<RecommendedSkillBundleResponse>(
    Query.SuggestedSkillsbyRole,
    () => authFetch(fetchRecommendedSkillBundle),
    {
      onError: () => onFormSubmit({ skills: [] })
    }
  )

  setLoading(isLoading)

  return (
    <>
      <Typography gutterBottom>
        Select any skills that you already have. You can change or add to these later
      </Typography>
      {!isLoading && (
        <SkillsAddForm
          ref={formRef}
          loading={buttonLoading}
          onFormSubmit={onFormSubmit}
          suggestionProps={[
            { groupId: 'all_skills', max: 10, data: data.all_skills, loading: isLoading }
          ]}
          hideSubmit
        />
      )}

      <FormFooter
        backUrl={backUrl}
        buttonProps={{
          loading: buttonLoading,
          onClick: async () => await formRef.current.submitForm()
        }}
      />
    </>
  )
}

export default SkillsForm
