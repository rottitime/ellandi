import { Box, styled, Typography } from '@mui/material'
import { FC, useRef } from 'react'
import { StandardRegisterProps } from './types'
import { SkillsType } from '@/service/types'
import SkillsAddForm from '../Account/SkillsAddForm/SkillsAddForm'
import FormFooter from '../FormFooter'

const SkillsForm: FC<StandardRegisterProps<SkillsType>> = ({
  onFormSubmit,
  buttonLoading,
  backUrl
}) => {
  const formRef = useRef(null)

  return (
    <>
      <Typography gutterBottom>
        Select any skills that you already have. You can change or add to these later
      </Typography>
      <SkillsAddForm
        ref={formRef}
        loading={buttonLoading}
        onFormSubmit={onFormSubmit}
        suggestionProps={{ type: 'job-role', max: 10 }}
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
