import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import FormFooter from '../FormFooter'
import { FC } from 'react'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'

const ContractType: FC<StandardRegisterProps<null>> = ({ onFormSubmit }) => {
  const { handleSubmit } = useForm()
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        Select your contract type. You can only choose one
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>
      <RadioGroup sx={{ mb: 3 }}>
        <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
        <FormControlLabel control={<Radio />} label="No" value="No" />
      </RadioGroup>
      <FormFooter backUrl="/register/page9" />
    </form>
  )
}

export default ContractType
