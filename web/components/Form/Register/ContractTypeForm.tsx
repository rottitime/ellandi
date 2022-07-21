import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { ContactType, GenericDataList, Query } from '@/service/types'
import { useQuery } from 'react-query'
import { fetchContractTypes } from '@/service/api'
import { FC, useEffect } from 'react'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { Controller, useForm } from 'react-hook-form'
import { StandardRegisterProps } from './types'
import FormFooter from '@/components/Form/FormFooter'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema: SchemaOf<ContactType> = object().shape({
  contract_type: string().required('This field is required')
})

const ContractTypeForm: FC<StandardRegisterProps<ContactType>> = ({
  onFormSubmit,
  backUrl,
  loading,
  defaultValues = {
    contract_type: ''
  }
}) => {
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    Query.ContractTypes,
    fetchContractTypes
  )

  const { control, handleSubmit } = useForm<ContactType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

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
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Typography variant="h3" gutterBottom>
        Select your current contract type. You can only choose one
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
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
              : data.map(({ name, slug }) => (
                  <FormControlLabel
                    key={slug}
                    control={<Radio />}
                    label={name}
                    value={slug}
                  />
                ))}
          </RadioGroup>
        )}
      />

      <FormFooter backUrl={backUrl} buttonProps={{ loading }} />
    </form>
  )
}

export default ContractTypeForm
