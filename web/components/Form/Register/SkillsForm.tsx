import { Typography } from '@mui/material'
import { FC, useRef } from 'react'
import { StandardRegisterProps } from './types'
import { MeSuggestedSkillsResponse, Query, SkillsType } from '@/service/types'
import SkillsAddForm from '../Account/SkillsAddForm/SkillsAddForm'
import FormFooter from '../FormFooter'
import { useQuery } from 'react-query'
import { fetchMeSuggestedSkillsByRole } from '@/service/me'
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

  const { data, isLoading } = useQuery<MeSuggestedSkillsResponse>(
    Query.SuggestedSkillsbyRole,
    () => authFetch(fetchMeSuggestedSkillsByRole)
  )

  setLoading(isLoading)

  return (
    <>
      <Typography gutterBottom>
        Select any skills that you already have. You can change or add to these later
      </Typography>

      <SkillsAddForm
        ref={formRef}
        loading={buttonLoading}
        onFormSubmit={onFormSubmit}
        suggestionProps={{ max: 10, data, loading: isLoading }}
        hideSubmit
      />
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
