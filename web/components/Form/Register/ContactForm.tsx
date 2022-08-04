import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { FC } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { ContactType } from '@/service/types'
import { boolean, object, SchemaOf } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

const schema: SchemaOf<ContactType> = object().shape({
  contact_preference: boolean()
})

const ContactForm: FC<StandardRegisterProps<ContactType>> = (props) => {
  const methods = useForm<ContactType>({
    defaultValues: { contact_preference: null },
    resolver: yupResolver(schema)
  })

  const { control } = methods

  return (
    <FormProvider {...methods}>
      <Form {...props}>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Are you happy for recruitment and HR to contact you with opportunities from time
          to time based on your skills? You can change this later
        </Typography>
        <Typography gutterBottom>
          This will only be in cases of emergency or an identified skills shortage in a
          particular area
        </Typography>

        <Controller
          name="contact_preference"
          control={control}
          render={({ field }) => (
            <RadioGroup sx={{ mb: 3 }} {...field}>
              {[
                { label: 'Yes', value: true },
                { label: 'No', value: false }
              ].map(({ label, value }) => (
                <FormControlLabel
                  key={label}
                  control={<Radio />}
                  label={label}
                  value={value}
                />
              ))}
            </RadioGroup>
          )}
        />
      </Form>
    </FormProvider>
  )
}

export default ContactForm
