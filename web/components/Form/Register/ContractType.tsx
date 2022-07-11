import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import FormFooter from '@/components/Form/FormFooter'
import { FC } from 'react'
import { StandardRegisterProps } from './types'
import { useForm } from 'react-hook-form'

const ContractType: FC<StandardRegisterProps<null>> = ({ backUrl, onFormSubmit }) => {
  const { handleSubmit } = useForm()
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        Are you happy for recruitment and HR to contact you with opportunities from time
        to time based on your skills? You can change this later
      </Typography>
      <Typography gutterBottom>
        This will only be in cases of emergency or an identified skills shortage in a
        particular area
      </Typography>
      <RadioGroup sx={{ mb: 3 }}>
        <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
        <FormControlLabel control={<Radio />} label="No" value="No" />
      </RadioGroup>
      <FormFooter backUrl={backUrl} />
    </form>
  )
}

export default ContractType
