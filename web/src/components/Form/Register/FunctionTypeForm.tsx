import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { FunctionType } from '@/service/api'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import Form from '@/components/Form/Register/FormRegister/FormRegister'
import data from '@/prefetch/functions.json'

const schema: SchemaOf<FunctionType> = object().shape({
  function: string().required(),
  function_other: string()
    .nullable()
    .when('function', (functionType) => {
      if (functionType === 'Other')
        return string().nullable().required('Enter your function')
    })
})

const FunctionTypeForm: FC<StandardRegisterProps<FunctionType>> = (props) => {
  const methods = useForm<FunctionType>({
    defaultValues: { function: '', function_other: '' },
    resolver: yupResolver(schema)
  })
  const { control, watch, setValue } = methods

  const watchFields = watch()

  useEffect(() => {
    if (!!watchFields.function_other) setValue('function', 'Other')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography gutterBottom>
          Select the function you belong to. You may only choose one
        </Typography>

        <Typography variant="body2" gutterBottom>
          Functions are groupings of particular types of work across government
        </Typography>

        <Controller
          name="function"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" {...field}>
              {data.map(({ name }) => (
                <Box key={name}>
                  <FormControlLabel control={<Radio />} label={name} value={name} />
                  {name === 'Other' && watchFields.function === 'Other' && (
                    <TextFieldControlled
                      name="function_other"
                      label="Enter function"
                      subfield
                    />
                  )}
                </Box>
              ))}
            </RadioGroup>
          )}
        />
      </Form>
    </FormProvider>
  )
}

export default FunctionTypeForm
