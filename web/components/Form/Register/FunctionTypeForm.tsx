import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { fetchFunctions, FunctionType, GenericDataList, Query } from '@/service/api'
import { useUiContext } from '@/context/UiContext'
import { FC, useEffect } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'

const schema: SchemaOf<FunctionType> = object().shape({
  function: string().required(),
  function_other: string().when('function', (functionType) => {
    if (functionType === 'other') return string().required('This is a required field')
  })
})

const FunctionTypeForm: FC<StandardRegisterProps<FunctionType>> = ({
  backUrl,
  skipUrl,
  defaultValues = { function: '', function_other: '' },
  onFormSubmit
}) => {
  const { setLoading } = useUiContext()

  const methods = useForm<FunctionType>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isDirty, isValid }
  } = methods

  const watchFields = watch()

  const { isLoading, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Functions,
    fetchFunctions,
    {
      staleTime: Infinity
    }
  )

  useEffect(() => {
    if (!!watchFields.function_other) setValue('function', 'Other')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Typography variant="subtitle1" gutterBottom>
          Select one Function which describes your area of specialism
        </Typography>

        <Typography gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        <Controller
          name="function"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-live="polite" aria-busy={isLoading} name="function">
              {isLoading ? (
                [...Array(5).keys()].map((i) => (
                  <RadioSkeleton key={i} width="80%" sx={{ mb: 1 }} />
                ))
              ) : (
                <>
                  {[...data, { name: 'Other' }].map(({ name }) => (
                    <FormControlLabel
                      key={name}
                      {...field}
                      control={<Radio />}
                      label={name}
                      value={name}
                    />
                  ))}
                </>
              )}
            </RadioGroup>
          )}
        />

        {watchFields.function === 'Other' && (
          <TextFieldControlled name="function_other" label="Enter function" />
        )}

        <FormFooter
          skipUrl={skipUrl}
          backUrl={backUrl}
          buttonProps={{
            disabled: !isDirty && !isValid
          }}
        />
      </form>
    </FormProvider>
  )
}

export default FunctionTypeForm
