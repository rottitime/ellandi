import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { FC } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, SchemaOf } from 'yup'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

type IsLineManagerInputs = {
  is_line_manager: string
}

const schema: SchemaOf<IsLineManagerInputs> = object().shape({
  is_line_manager: string().required()
})

const IsLineManagerForm: FC<StandardRegisterProps<IsLineManagerInputs>> = (props) => {
  const methods = useForm<IsLineManagerInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      is_line_manager: ''
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
          name="is_line_manager"
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

export default IsLineManagerForm
