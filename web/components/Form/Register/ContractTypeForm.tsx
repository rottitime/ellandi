import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { ContractType, GenericDataList, Query } from '@/service/types'
import { useQuery } from 'react-query'
import { fetchContractTypes } from '@/service/api'
import { FC, useEffect } from 'react'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { StandardRegisterProps } from './types'
import FormFooter from '@/components/Form/FormFooter'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'

const schema: SchemaOf<ContractType> = object().shape({
  contract_type: string().required('This field is required'),
  contract_type_other: string().when('contract_type', (functionType) => {
    if (functionType === 'other') return string().required('This is a required field')
  })
})

const ContractTypeForm: FC<StandardRegisterProps<ContractType>> = ({
  onFormSubmit,
  backUrl,
  loading,
  defaultValues = {
    contract_type: '',
    contract_type_other: ''
  }
}) => {
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.ContractTypes,
    fetchContractTypes
  )

  const methods = useForm<ContractType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, isValid }
  } = methods

  const watchFields = watch()

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    if (!!watchFields.contract_type_other) setValue('contract_type', 'Other')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          Select your current contract type. You can only choose one
        </Typography>
        <Typography gutterBottom>
          We'll use this to suggest learning opportunities that are relevant to you
        </Typography>

        <Controller
          name="contract_type"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              {isLoading
                ? [...Array(4).keys()].map((i) => (
                    <RadioSkeleton key={i} width="80%" sx={{ mb: 1 }} />
                  ))
                : data.map(({ name }) => (
                    <FormControlLabel
                      key={name}
                      control={<Radio />}
                      label={name}
                      value={name}
                    />
                  ))}
            </RadioGroup>
          )}
        />

        {watchFields.contract_type === 'Other' && (
          <TextFieldControlled name="contract_type_other" label="Enter contract type" />
        )}

        <FormFooter
          backUrl={backUrl}
          buttonProps={{ loading, disabled: !isDirty && !isValid }}
        />
      </form>
    </FormProvider>
  )
}

export default ContractTypeForm
