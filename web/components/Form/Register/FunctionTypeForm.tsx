import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { fetchFunctions, FunctionType, GenericDataList, Query } from '@/service/api'
import { FC, useEffect } from 'react'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

const schema: SchemaOf<FunctionType> = object().shape({
  function: string().required(),
  function_other: string()
    .nullable()
    .when('function', (functionType) => {
      if (functionType === 'Other')
        return string().nullable().required('This is a required field')
    })
})

const FunctionTypeForm: FC<StandardRegisterProps<FunctionType>> = (props) => {
  const methods = useForm<FunctionType>({
    defaultValues: { function: '', function_other: '' },
    resolver: yupResolver(schema)
  })
  const { control, watch, setValue } = methods

  const watchFields = watch()

  const { isLoading, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Functions,
    fetchFunctions,
    { staleTime: Infinity }
  )

  useEffect(() => {
    if (!!watchFields.function_other) setValue('function', 'Other')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <Form {...props} submitDisabled>
        <Typography gutterBottom>
          Select a function which describes your area of specialism. You may only choose
          one
        </Typography>

        <Typography variant="body2" gutterBottom>
          Functions are groupings of particular types of work across government
        </Typography>

        <Controller
          name="function"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" aria-busy={isLoading} {...field}>
              {isLoading
                ? [...Array(5).keys()].map((i) => (
                    <RadioSkeleton key={i} width="80%" sx={{ mb: 1 }} />
                  ))
                : data.map(({ name }) => (
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
