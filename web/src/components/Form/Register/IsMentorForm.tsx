import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { FC } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, SchemaOf } from 'yup'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

type IsMentorInputs = {
  is_mentor: string
}

const schema: SchemaOf<IsMentorInputs> = object().shape({
  is_mentor: string().required()
})

const IsMentorForm: FC<StandardRegisterProps<IsMentorInputs>> = (props) => {
  const methods = useForm<IsMentorInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      is_mentor: ''
    }
  })

  const { control } = methods

  const options = [
    {
      name: 'Yes',
      order: 1
    },
    {
      name: 'No',
      order: 2
    },
    {
      name: `I don't know`,
      order: 3
    }
  ]

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography gutterBottom>You may only choose one</Typography>

        <Controller
          name="is_mentor"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" {...field}>
              {options.map(({ name }) => (
                <Box key={name}>
                  <FormControlLabel control={<Radio />} label={name} value={name} />
                </Box>
              ))}
            </RadioGroup>
          )}
        />
      </Form>
    </FormProvider>
  )
}

export default IsMentorForm
