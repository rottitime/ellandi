import { Typography } from '@mui/material'
import { FC } from 'react'
import { StandardRegisterProps } from './types'
import { SkillsType } from '@/service/types'
import SkillsAddForm from '../Account/SkillsAddForm/SkillsAddForm'

const SkillsForm: FC<StandardRegisterProps<SkillsType>> = ({
  onFormSubmit,
  buttonLoading
}) => {
  return (
    <>
      <Typography gutterBottom>
        Select any skills that you already have. You can change or add to these later
      </Typography>
      <SkillsAddForm
        loading={buttonLoading}
        onFormSubmit={onFormSubmit}
        suggestionProps={{ type: 'job-role', max: 10 }}
      />
    </>
  )
}

export default SkillsForm
