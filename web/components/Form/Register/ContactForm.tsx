import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import FormFooter from '@/components/Form/FormFooter'
import { FC } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, useForm } from 'react-hook-form'
import { ContactType } from '@/service/types'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema: SchemaOf<ContactType> = object().shape({
  contact: string()
})

const ContactForm: FC<StandardRegisterProps<ContactType>> = ({
  backUrl,
  defaultValues = { contact: '' },
  onFormSubmit
}) => {
  const { handleSubmit, control } = useForm<ContactType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

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

      <Controller
        name="contact"
        control={control}
        render={({ field }) => (
          <RadioGroup sx={{ mb: 3 }} {...field}>
            {['Yes', 'No'].map((value) => (
              <FormControlLabel
                key={value}
                control={<Radio />}
                label={value}
                value={value}
              />
            ))}
          </RadioGroup>
        )}
      />

      <FormFooter backUrl={backUrl} />
    </form>
  )
}

export default ContactForm
