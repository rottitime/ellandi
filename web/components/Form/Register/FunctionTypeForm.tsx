import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
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
    formState: { isDirty, isValid }
  } = methods
  const watchFunctionType = watch('function')

  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.Functions,
    fetchFunctions,
    {
      staleTime: Infinity
    }
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  if (isError)
    return (
      <Alert severity="error">
        <AlertTitle>Service Unavailable</AlertTitle>
        Please try again later.
      </Alert>
    )

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
                  {data.map(({ name, slug }) => (
                    <FormControlLabel
                      key={slug}
                      {...field}
                      control={<Radio />}
                      label={name}
                      value={slug}
                    />
                  ))}
                  <FormControlLabel
                    {...field}
                    control={<Radio />}
                    label="Other"
                    value="other"
                  />
                </>
              )}
            </RadioGroup>
          )}
        />

        {watchFunctionType === 'other' && (
          <TextFieldControlled name="function_other" label="Enter function" />
        )}

        <FormFooter
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
